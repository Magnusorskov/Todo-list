import Checklist from "./Checklist";
import { Urgency } from "./Urgency";
import { calculateProgressInPercentage } from "./calculationUtils";

export default class Todo {
    #title;
    #description;
    #dueDate;
    #urgency;
    #progress;
    #checkLists;
    #note;
    #id;

    constructor(
        title,
        description = null,
        dueDate = null,
        urgency = Urgency.MEDIUM,
        note = null
    ) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#urgency = urgency;
        this.#checkLists = [];
        this.#note = note;
        this.#id = crypto.randomUUID();
    }

    get progress() {
        return this.#progress;
    }

    set progress(value) {
        this.#progress = value;
    }

    get checkLists() {
        return this.#checkLists;
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

    addChecklist(category) {
        const newChecklist = new Checklist(category);
        this.#checkLists.push(newChecklist);
        return newChecklist;
    }

    finishCompleteCheckList(checklist) {
        for (const item of checklist.items) {
            checklist._finishItem(item);
        }
    }

    countProgress() {
        return this.checkLists.reduce(
            (accumulator, checklist) => {
                const checkListProgress = checklist.countProgress();
                accumulator.completed += checkListProgress.completed;
                accumulator.inProgress += checkListProgress.inProgress;
                return accumulator;
            },
            { completed: 0, inProgress: 0 }
        );
    }

    calculateProgressInPercentage() {
        return calculateProgressInPercentage(this.countProgress());
    }
}
