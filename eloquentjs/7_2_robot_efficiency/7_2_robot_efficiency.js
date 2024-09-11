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
 * ----------- ROBOT ZOO (book)-----------
 */

function randoBot(state) {
    return {direction: randomPick(roadGraph[state.place])}
}

function routeBot(state, memory = []) {
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

function goalOrientedBot({place, parcels}, route = []) {
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
 * ----------- ROBOT ZOO (originals) -----------
 */

/**
 * First uses brute force search the find the shortest route and then follows it
 */
function brutusBot(state,  memory = {route: []}) {
    let bestRoute;
    let relevantLocations = [];
    let shortestRouteUpperBound = Infinity;

    if (memory.route.length === 0) {

        shortestRouteUpperBound = runRobot(state, thoughtfulPickupDropoffBot) + 1;

        if (relevantLocations.length === 0) { 
            for ({place, address} of state.parcels) {
                if (!relevantLocations.includes(place)) {
                    relevantLocations.push(place);
                }
                if (!relevantLocations.includes(address)) {
                    relevantLocations.push(address);
                }
            }
        }

        bruteSearch(state, history = []);
        memory.route = bestRoute;
        memory.route.slice(1);
    }

    function bruteSearch(internalState, history = []) {
        if (bestRoute !== undefined && history.length >= bestRoute.length) {
            return;
        } else if (history.length > shortestRouteUpperBound) { 
            return;
        } else if (internalState.parcels.length === 0) {
            bestRoute = [...history, internalState.place];
            return;
        } else if (history.length >= 2) {
            let currentLocation = internalState.place;
            let lastLocation = history[history.length - 1];
            let secondToLastLocation = history[history.length - 2];

            const uselesslyBacktracking = !relevantLocations.includes(lastLocation) && (secondToLastLocation === currentLocation);
            if (uselesslyBacktracking) {
                return;
            }
        }

        history = [...history, internalState.place];
        let nextPlaces = roadGraph[internalState.place];

        for (place of nextPlaces) {
            bruteSearch(internalState.move(place), history);
        }
    }

    return {
        direction: memory.route[0],
        memory: {route: memory.route.slice(1), relevantLocations: memory.relevantLocations}
    };
}

/**
 * Picks up all the mail first before beginning deliveries
 */
function pickupDropoffBot({place, parcels}, route = []) {
    if (route.length === 0) {
        let unattainedParcelPickups = parcels.filter(j => j.place !== place).map(j => j.place);
        let undeliveredParcelsDropoffs = parcels.filter(j => j.place === place).map(j => j.address);;
        
        if (unattainedParcelPickups.length !== 0) {
            route = findRoute(roadGraph, place, unattainedParcelPickups[0]);
        } else {
            route = findRoute(roadGraph, place, undeliveredParcelsDropoffs[0]);
        }
    }

    return {direction: route[0], memory: route.slice(1)};
}

/**
 * Picks up all the closest mail first before beginning closest deliveries
 */
function thoughtfulPickupDropoffBot({place, parcels}, route = []) {
    if (route.length === 0) {
        let unattainedParcelPickups = parcels.filter(j => j.place !== place).map(j => j.place);
        let undeliveredParcelsDropoffs = parcels.filter(j => j.place === place).map(j => j.address);;
        
        if (unattainedParcelPickups.length !== 0) {
            route = shortestRouteFromLocations(place, unattainedParcelPickups);
        } else  {
            route = shortestRouteFromLocations(place, undeliveredParcelsDropoffs);
        }
    }

    function shortestRouteFromLocations(place, parcelLocationList) {
        let possibleRoutes = [];
        
        for (parcelLocation of parcelLocationList) {
            possibleRoutes.push(findRoute(roadGraph, place, parcelLocation))
        }
      
        possibleRoutes.sort((a, b) => {
            if (a.length > b.length) {
                return 1;
            } else if(a.length < b.length) {
                return -1;
            }
            return 0;
        });

        return possibleRoutes[0];
    }

    return {direction: route[0], memory: route.slice(1)};
}

/**
 * Prioritizes doing the closest available action (pickup or delivery)
 */
function closestActionBot({place, parcels}, route = []) {
    if (route.length === 0) {
        let testArray = []

        let unattainedParcelPickups = parcels.filter(j => j.place !== place).map(j => j.place);
        let undeliveredParcelsDropoffs = parcels.filter(j => j.place === place).map(j => j.address);;
        
        let placesWithAvailableAction = [...unattainedParcelPickups, ...undeliveredParcelsDropoffs]; 

        route = shortestRouteFromLocations(place, placesWithAvailableAction);
    }

    function shortestRouteFromLocations(place, parcelLocationList) {
        let possibleRoutes = [];
        
        for (parcelLocation of parcelLocationList) {
            possibleRoutes.push(findRoute(roadGraph, place, parcelLocation))
        }
      
        possibleRoutes.sort((a, b) => {
            if (a.length > b.length) {
                return 1;
            } else if(a.length < b.length) {
                return -1;
            }
            return 0;
        });

        return possibleRoutes[0];
    }

    return {direction: route[0], memory: route.slice(1)};
}

/**
 * Delivers mail like the goal oriented bot but needs to return to farm periodically to see the horses
 */
function goalOrientedButLovesHorsesBot({place, parcels}, memory = {route: [], turnsWithoutSeeingHorse: Infinity}) {
    if (place === "Farm") {
        memory.turnsWithoutSeeingHorse = 0;
    }

    if (memory.route.length === 0) {
        let destination;
        if (memory.turnsWithoutSeeingHorse > 5) {
            destination = "Farm";
        } else {
            destination = goalOrientedBot({place, parcels}, []).direction;
        }
        memory.route = findRoute(roadGraph, place, destination);
    }

    return {direction: memory.route[0], memory: {route: memory.route.slice(1), turnsWithoutSeeingHorse: memory.turnsWithoutSeeingHorse++}}
}

/**
 * Polls all the other robots to see what they would do for a given state, and then picks the most popular option
 */
function pollBot(state, route = []) {
    let poll = []

    for (robot of Object.keys(roboDictionary)) {
        if (roboDictionary[robot] !== pollBot) {
            poll.push(roboDictionary[robot](state).direction);
        }
    }

    function countBy(items, groupName) {
        let counts = [];
    
        for (let item of items) {
            let name = groupName(item);
            let known = counts.findIndex(c => c.name === name);
            if (known === -1) {
                counts.push({name, count: 1});
            } else {
                counts[known].count++;
            }
        } 
    
        return counts;
    }

    let pollResults = countBy(poll, j => j)

    pollResults.sort((a, b) => {
        if (a.count < b.count) {
            return 1;
        } else if (a.count > b.count){
            return -1;
        }
        return 0;
    });

    return {direction: pollResults[0].name, memory: route.slice(1)};
}

let roboDictionary = {
    routeBot: routeBot,
    goalOrientedBot: goalOrientedBot,
    randoBot: randoBot,
    goalOrientedButLovesHorsesBot: goalOrientedButLovesHorsesBot,
    brutusBot: brutusBot,
    pickupDropoffBot: pickupDropoffBot,
    thoughtfulPickupDropoffBot: thoughtfulPickupDropoffBot,
    closestActionBot: closestActionBot,
    pollBot: pollBot,
}

let roadGraph = buildGraph(roads);

let results = robotComparison(roboDictionary, 100, 5);

results.sort((a, b) => {
    if(a.averageSteps > b.averageSteps) {
        return 1;
    } else if (a.averageSteps < b.averageSteps){
        return -1;
    }
    return 0;
});

console.log(results);

/*
[
  {
    name: 'brutusBot',
    averageSteps: 11.44,
    averageMilliseconds: 35.205591000000005
  },
  {
    name: 'thoughtfulPickupDropoffBot',
    averageSteps: 11.5,
    averageMilliseconds: 0.040048000000001596
  },
  {
    name: 'closestActionBot',
    averageSteps: 11.6,
    averageMilliseconds: 0.05564600000000155
  },
  {
    name: 'pollBot',
    averageSteps: 13.15,
    averageMilliseconds: 83.222148
  },
  {
    name: 'pickupDropoffBot',
    averageSteps: 13.39,
    averageMilliseconds: 0.01863800000000083
  },
  {
    name: 'goalOrientedBot',
    averageSteps: 14.33,
    averageMilliseconds: 0.04005600000000001
  },
    name: 'goalOrientedButLovesHorsesBot',
    averageSteps: 15.16,
    averageMilliseconds: 0.042288
  },
  {
    name: 'routeBot',
    averageSteps: 18.13,
    averageMilliseconds: 0.028542000000000022
  },
  {
    name: 'randoBot',
    averageSteps: 71.92,
    averageMilliseconds: 0.04459399999999995
  }
]
*/
