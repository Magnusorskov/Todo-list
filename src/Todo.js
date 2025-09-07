import { Checklist } from "./Checklist";
import { Urgency } from "./urgency";

class Todo {
    #title;
    #description;
    #dueDate;
    #urgency;
    #progress;
    #checkList;
    #id;

    constructor(
        title,
        description = null,
        dueDate = null,
        urgency = Urgency.MEDIUM
    ) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#urgency = urgency;
        this.#checkList = [];
        this.#id = crypto.randomUUID();
    }

    get progress() {
        return this.#progress;
    }

    set progress(value) {
        this.#progress = value;
    }

    get checkList() {
        return this.#checkList;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(value) {
        this.#dueDate = value;
    }

    get urgency() {
        return this.#urgency;
    }

    set urgency(value) {
        this.#urgency = value;
    }

    get id() {
        return this.#id;
    }

    finishCompleteCheckList(checklist) {
        for (const item of checklist.items) {
            checklist._finishItem(item);
        }
    }
}
