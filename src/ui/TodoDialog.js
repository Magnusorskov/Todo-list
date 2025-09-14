import Todo from "../models/Todo";

function initTodoDialog(onSubmit) {
    const todoDialog = document.querySelector(".todo-dialog");
    const todoForm = document.querySelector(".todo-dialog__form");
    const cancelTodoButton = document.querySelector(
        ".todo-dialog__button--cancel"
    );
    const addTodo = document.querySelector(".add-todo");

    addTodo.addEventListener("click", () => {
        todoDialog.showModal();
    });

    cancelTodoButton.addEventListener("click", () => {
        todoDialog.close();
    });

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const todoData = Object.fromEntries(formData);
        onSubmit(todoData);
        event.target.reset();
        todoDialog.close();
    });
}

export { initTodoDialog };
