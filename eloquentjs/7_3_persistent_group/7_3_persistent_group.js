class PGroup {
    static empty = new PGroup();

    constructor(group = []) {
        this.group = group;
    }

    has(item) {
        return this.group.includes(item);
    }

    add(item) {
        if (!this.has(item)) {
            return new PGroup([...this.group, item]);
        } else {
            console.log(`Group already includes item '${item}!'`);
        }
    }

    delete(item) {
        if (this.has(item)) {
            let cloneGroup = [...this.group];
            cloneGroup.splice(cloneGroup.findIndex(j => j === item), 1);
            return new PGroup(cloneGroup);
        } else {
            console.log(`Group doesn't have '${item}'!`);
        }
    }

    display() {
        console.log(JSON.stringify(this.group));
    }

}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
