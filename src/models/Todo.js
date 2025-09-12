import Checklist from "./Checklist";
import { Urgency } from "./Urgency";
import { calculateProgressInPercentage } from "../utils/calculationUtils";
import * as crypto from "node:crypto";

export default class Todo {
    #title;
    #description;
    #dueDate;
    #urgency;
    #checkLists;
    #note;
    #id;

    constructor(
        title,
        description = null,
        dueDate = null,
        urgency = Urgency.MEDIUM,
        note = null,
        id = crypto.randomUUID(),
        checkLists = []
    ) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#urgency = urgency;
        this.#note = note;
        this.checkLists = checkLists;
    }

    get checkLists() {
        return this.#checkLists;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        this.#title = newTitle;
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(newDueDate) {
        this.#dueDate = newDueDate;
    }

    get urgency() {
        return this.#urgency;
    }

    set urgency(newUrgency) {
        this.#urgency = newUrgency;
    }

    get id() {
        return this.#id;
    }

    get note() {
        return this.#note;
    }

    set note(newNote) {
        this.#note = newNote;
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
