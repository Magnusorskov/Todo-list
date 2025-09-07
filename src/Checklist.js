export {Checklist};

class Checklist {
    #items = [];

    constructor(description) {
        this.addItem(description);
    }

    get items() {
        return this.#items;
    }

    addItem(description) {
        this.#items.push({description: description, completed: false});
    }
}