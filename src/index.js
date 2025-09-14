import "./styles.css";
import "js-circle-progress";
import Repository from "./repository";
import LocalStorageService from "./services/LocalStorageService";
import Project from "./models/Project";
import { initProjectDialog } from "./ui/ProjectDialog.js";
import { updateProjectNav } from "./ui/ProjectList.js";

const addTodo = document.querySelector(".add-todo");
const closeDialog = document.querySelector(".todo-dialog__button--cancel");
const addTodoDialog = document.querySelector(".todo-dialog");

addTodo.addEventListener("click", () => {
    addTodoDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    addTodoDialog.close();
});

document.addEventListener("DOMContentLoaded", () => {
    const projectRepository = new Repository(LocalStorageService);

    initProjectDialog((projectName) => {
        const newProject = new Project(projectName);
        projectRepository.addProject(newProject);
        updateProjectNav(projectRepository);
    });

    updateProjectNav(projectRepository);
});