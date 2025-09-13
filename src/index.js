import "./styles.css";
import "js-circle-progress";

const addTodo = document.querySelector(".add-todo");
const closeDialog = document.querySelector(".todo-dialog__button--cancel");
const addTodoDialog = document.querySelector(".todo-dialog");

addTodo.addEventListener("click", () => {
    addTodoDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    addTodoDialog.close();
});

const addProject = document.querySelector(".add-project-button");
const closeProjectDialog = document.querySelector(
    ".project-dialog__button--cancel"
);
const addProjectDialog = document.querySelector(".project-dialog");

addProject.addEventListener("click", () => {
    addProjectDialog.showModal();
});

closeProjectDialog.addEventListener("click", () => {
    addProjectDialog.close();
});
