class Group {
    constructor() {
        this.set = [];
    }

    has(item) {
        return this.set.includes(item);
    }

    add(item) {
        if (!this.has(item)) {
            this.set.push(item);
        } else {
            console.log(`Set already includes item '${item}!'`);
        }
    }

    delete(item) {
        if (this.has(item)) {
            this.set.splice(this.set.findIndex(j => j === item), 1);
        } else {
            console.log(`Set doesn't have '${item}'!`);
        }
    }

    static from(inputArray) {
        let output = new Group();

        for (let element of inputArray) {
            output.add(element);
        }

        return output;
    }

    display() {
        console.log(JSON.stringify(this.set));
    }

}

let test = [1, 2 ,3 ,4 ,'a'];

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

console.log("\nTest complete");
