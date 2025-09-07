import { Checklist } from "./Checklist";

class Todo {
    #title;
    #description;
    #dueDate;
    #priority;
    #progress;
    #checkList;

    constructor(title, description = null, dueDate = null, priority = "Low") {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#checkList = [];
    }
}
