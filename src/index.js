import "./styles.css";
import "js-circle-progress";
import Repository from "./repository";
import LocalStorageService from "./services/LocalStorageService";
import Project from "./models/Project";
import { projectFormEventListener } from "./ui/ProjectFormEventListener";

const addTodo = document.querySelector(".add-todo");
const closeDialog = document.querySelector(".todo-dialog__button--cancel");
const addTodoDialog = document.querySelector(".todo-dialog");

const newProjectButton = document.querySelector(".add-project-button");
const closeProjectDialog = document.querySelector(
    ".project-dialog__button--cancel"
);

addTodo.addEventListener("click", () => {
    addTodoDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    addTodoDialog.close();
});

const newProjectDialog = document.querySelector(".project-dialog");

newProjectButton.addEventListener("click", () => {
    newProjectDialog.showModal();
});

closeProjectDialog.addEventListener("click", () => {
    newProjectDialog.close();
});

document.addEventListener("DOMContentLoaded", () => {
    const projectRepository = new Repository(LocalStorageService);

    projectFormEventListener(projectRepository);
});
