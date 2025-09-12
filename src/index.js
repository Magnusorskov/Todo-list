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

const addProject = document.querySelector(".add-project");
const closeProjectDialog = document.querySelector(
    ".Project-dialog__button--cancel"
);
const addProjectDialog = document.querySelector(".Project-dialog");

addProject.addEventListener("click", () => {
    addProjectDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    addProjectDialog.close();
});
