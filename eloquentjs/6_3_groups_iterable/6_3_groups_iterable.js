class GroupIterator {
    constructor(group) {
        this.n = 0;
        this.group = group;
    }

    next() {
        if (this.n === this.group.length) {
            return {done: true}
        }

        const output = {value: this.group[this.n], done: false};
        this.n++;

        return output;
    }
}

class Group {
    constructor() {
        this.group = [];
    }

    has(item) {
        return this.group.includes(item) ? true : false;
    }

    add(item) {
        if (!this.has(item)) {
            this.group.push(item);
        } else {
            console.log(`Group already includes item '${item}!'`);
        }
    }

    delete(item) {
        if (this.has(item)) {
            this.group.splice(this.group.findIndex(j => j === item), 1);
        } else {
            console.log(`Group doesn't have '${item}'!`);
        }
    }

    static from(inputArray) {
        let output = new Group();

        for (let element of inputArray) {
            output.add(element);
        }

        return output;
    }

    [Symbol.iterator]() {
        return new GroupIterator(this.group);
    }

    display() {
        console.log(JSON.stringify(this.group));
    }
}

let test = [1, 2, 3, 4, 'a'];

let testGroup = Group.from(test);

console.log("\nOriginal");
testGroup.display();

console.log("\nAdding '6'");
testGroup.add('6');
testGroup.display();

console.log("\nAdding '6'");
testGroup.add('6');
testGroup.display();

console.log("\nAdding 6");
testGroup.add(6);
testGroup.display();

console.log("\nDelete 2");
testGroup.delete(2);
testGroup.display();

console.log("\nDelete 6");
testGroup.delete(6);
testGroup.display();

console.log("\nDelete 't'");
testGroup.delete('t');
testGroup.display();

console.log("\nIterator Test");
for(let element of testGroup) {
    console.log(`${element} is having a good day.`)
}

console.log("\nTest complete");
