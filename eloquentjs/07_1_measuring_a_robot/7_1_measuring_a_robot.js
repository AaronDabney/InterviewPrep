const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
    const graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    for (let [from, to] of edges.map(r => r.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            const parcels = this.parcels.map(p => {
                if (p.place !== this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place !== p.address);

            return new VillageState(destination, parcels);
        }

    }
}

VillageState.random = function(parcelCount = 5) {
    const parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;

        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place === address);

        parcels.push({place, address})
    }
    return new VillageState("Post Office", parcels);
}


function randomPick(array) {
    const choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function findRoute(graph, from, to) {
    const work = [{at: from, route: []}];

    for (let i = 0; i < work.length; i++) {
      const {at, route} = work[i];

      for (let place of graph[at]) {
        if (place === to) {
            return route.concat(place);
        }

        if (!work.some(w => w.at === place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
}

/**
 * ----------- ROBOT SIMULATION/TESTING -----------
 */

function runRobot(state, robot, memory) {
    const maxIter = 5000;
    for (let turn = 0; turn < maxIter; turn++) {
        if (state.parcels.length === 0) {
            return turn;
        }

        let action = robot(state, memory);
        state =  state.move(action.direction);
        memory = action.memory;
    }
    throw `${robot.name} HAS EXCEEDED ${maxIter} ITERATIONS`;
}

function robotComparison(robots, numTests, parcelCount) {
    const tests = [];
    for (let i = 0; i < numTests; i++) {
        tests.push(new VillageState.random(parcelCount))
    }

    const results = [];
    for (robot of Object.keys(robots)) {
        console.log(`Testing: ${robot}`);

        let acc = 0;
        const t0 = performance.now();
        for (test of tests) {
            acc += runRobot(test, robots[robot]);
        }
        const t1 = performance.now();
        const delta = t1 - t0;
        
        results.push({name: robot, averageSteps: acc / numTests, averageMilliseconds: delta / numTests});
    }

    return results;
}

/**
 * ----------- ROBOT ZOO -----------
 */

function randoBot(state) {
    return {direction: randomPick(roadGraph[state.place])}
}

function routeRobot(state, memory = []) {
    const mailRoute = [
        "Alice's House", "Cabin", "Alice's House", "Bob's House",
        "Town Hall", "Daria's House", "Ernie's House",
        "Grete's House", "Shop", "Grete's House", "Farm",
        "Marketplace", "Post Office"
    ];
    
    if (memory.length === 0) {
      memory = mailRoute;
    }
    
    return {direction: memory[0], memory: memory.slice(1)};
}

function goalOrientedRobot({place, parcels}, route = []) {
    if (route.length === 0) {
      const parcel = parcels[0];

      if (parcel.place !== place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    
    return {direction: route[0], memory: route.slice(1)};
}

/**
 * ----------- TEST EXECUTION -----------
 */

const roadGraph = buildGraph(roads);

const roboDictionary = {
    randoBot: randoBot,
    goalOrientedRobot: goalOrientedRobot,
    routeRobot: routeRobot
}

const results = robotComparison(roboDictionary, 100, 5);

results.sort((a, b) => {
    if (a.averageSteps > b.averageSteps) {
        return 1;
    } else if (a.averageSteps < b.averageSteps){
        return -1;
    }
    return 0;
});

console.log(results);

/*
 * Results: 
[
    {
      name: 'goalOrientedRobot',
      averageSteps: 14.54,
      averageMilliseconds: 0.053530000000000015
    },
    {
      name: 'routeRobot',
      averageSteps: 18.4,
      averageMilliseconds: 0.012616000000000014
    },
    {
      name: 'randoBot',
      averageSteps: 68.07,
      averageMilliseconds: 0.06361399999999996
    }
  ]
*/
