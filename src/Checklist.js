import { Urgency } from "./urgency";
import { calculateProgressInPercentage } from "./calculationUtils";

export default class Checklist {
    #items;
    #category;

    constructor(category) {
        this.#category = category;
        this.#items = [];
    }

    get items() {
        return this.#items;
    }

    get category() {
        return this.#category;
    }

    set category(value) {
        this.#category = value;
    }

    addItem(description, urgency = Urgency.MEDIUM, dateToComplete) {
        const newItem = {
            id: crypto.randomUUID(),
            description: description,
            urgencyLevel: urgency,
            dateToComplete: dateToComplete,
            completed: false,
        };
        this.#items.push(newItem);
        return newItem;
    }

    findItem(itemId) {
        return this.#items.find((item) => item.id === itemId);
    }

    _finishItem(item) {
        item.completed = true;
    }

    finishItemById(itemID) {
        const itemToFinish = this.findItem(itemID);

        if (itemToFinish) {
            this._finishItem(itemToFinish);
        }
    }

    deleteItem(itemId) {
        this.#items = this.#items.filter((item) => item.id !== itemId);
    }

    editItem(itemId, properties) {
        const itemToEdit = this.findItem(itemId);

        if (itemToEdit) {
            Object.assign(itemToEdit, properties);
        }
    }

    countProgress() {
        return this.#items.reduce(
            (accumulator, item) => {
                if (item.completed) {
                    accumulator.completed++;
                } else {
                    accumulator.inProgress++;
                }
                return accumulator;
            },
            { completed: 0, inProgress: 0 }
        );
    }

    calculateProgressInPercentage() {
        return calculateProgressInPercentage(this.countProgress());
    }
}
