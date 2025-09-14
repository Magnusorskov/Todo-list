import Todo from "./Todo";
import { Urgency } from "./Urgency";
import { calculateProgressInPercentage } from "../utils/calculationUtils";

export default class Project {
    #name;
    #todoLists;
    #id;

    constructor(name, todoLists = []) {
        this.#name = name;
        this.#todoLists = todoLists;
        this.#id = crypto.randomUUID();
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get todoLists() {
        return this.#todoLists;
    }

    createTodo(
        title,
        description = null,
        dueDate = null,
        urgency = Urgency.MEDIUM,
        note = null
    ) {
        const newTodo = new Todo(title, description, dueDate, urgency, note);
        this.#todoLists.push(newTodo);
        return newTodo;
    }

    deleteTodo(todoToDelete) {
        this.#todoLists = this.#todoLists.filter(
            (todo) => todo !== todoToDelete
        );
    }

    countProgress() {
        return this.todoLists.reduce(
            (accumulator, todoList) => {
                const todoListProgress = todoList.countProgress();
                accumulator.completed += todoListProgress.completed;
                accumulator.inProgress += todoListProgress.inProgress;
                return accumulator;
            },
            { completed: 0, inProgress: 0 }
        );
    }

    calculateProgressInPercentage() {
        return calculateProgressInPercentage(this.countProgress());
    }

    toJSON() {
        return {
            name: this.#name,
            todoLists: this.#todoLists,
            id: this.#id,
        };
    }
}
