import "./styles.css";
import "js-circle-progress";
import Repository from "./repository";
import LocalStorageService from "./services/LocalStorageService";
import Project from "./models/Project";

const addTodo = document.querySelector(".add-todo");
const closeDialog = document.querySelector(".todo-dialog__button--cancel");
const addTodoDialog = document.querySelector(".todo-dialog");
const projectForm = document.querySelector(".project-dialog__form");
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

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const projectData = Object.fromEntries(formData);
        projectRepository.addProject(new Project(projectData["project-name"]));
        console.log(projectRepository.projects);
    });
});
