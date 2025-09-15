import { createChecklistElement } from "./Checklist.js";

function createTodoCard(
    todo,
    onItemDelete,
    onItemToggle,
    onItemAdd,
    onChecklistAdd
) {
    const newTodoCard = document.createElement("div");
    newTodoCard.classList.add("todo-card");

    // --- Main Info Container --- //
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("todo-info-container");

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const calculatedProgress = todo.calculateProgressInPercentage();
    console.log(
        `Rendering Todo: "${todo.title}", Calculated Progress: ${calculatedProgress}%`
    );

    const progressCircle = document.createElement("circle-progress");
    progressCircle.setAttribute("value", calculatedProgress.toString());
    infoContainer.appendChild(title);

    const description = document.createElement("p");
    description.textContent = todo.description;
    infoContainer.appendChild(description);

    const dueDate = document.createElement("div");
    dueDate.classList.add("date-to-complete");
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = todo.dueDate;
    dateInput.classList.add("date-picker");
    dueDate.appendChild(dateInput);
    infoContainer.appendChild(dueDate);

    const urgency = document.createElement("div");
    urgency.classList.add("urgency", `urgency-${todo.urgency.toLowerCase()}`);
    urgency.textContent = todo.urgency;
    infoContainer.appendChild(urgency);

    const notes = document.createElement("button");
    notes.classList.add("notes-button");
    notes.textContent = "Notes";
    notes.addEventListener("click", () => {
        if (notes.textContent === "Notes") {
            const note = todo.note;
            if (note) {
                notes.textContent = note;
            }
        } else {
            notes.textContent = "Notes";
        }
    });
    infoContainer.appendChild(notes);

    // --- Checklists Container --- //
    const checklistsContainer = document.createElement("div");
    checklistsContainer.classList.add("checklists-container");

    todo.checkLists.forEach((checklist) => {
        const newChecklistElement = createChecklistElement(
            checklist,
            onItemDelete,
            onItemToggle,
            onItemAdd
        );
        checklistsContainer.appendChild(newChecklistElement);
    });

    // --- Add Checklist Button --- //
    const addChecklistButton = document.createElement("button");
    addChecklistButton.textContent = "+ New Checklist";
    addChecklistButton.classList.add("add-checklist-button");
    addChecklistButton.addEventListener("click", () => {
        const category = prompt("Enter new checklist category:");
        if (category) {
            onChecklistAdd(category, todo.id);
        }
    });

    // --- Assemble The Card --- //
    newTodoCard.appendChild(infoContainer);
    newTodoCard.appendChild(checklistsContainer);
    newTodoCard.appendChild(addChecklistButton);

    return newTodoCard;
}

export function updateTodoList(
    project,
    onItemDelete,
    onItemToggle,
    onItemAdd,
    onChecklistAdd
) {
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.innerHTML = "";
    const projectName = document.querySelector(".project-name");
    projectName.textContent = project.name;

    if (!project) {
        todoContainer.innerHTML = "<p>Select a project to see its todos.</p>";
        return;
    }

    const projectTodos = project.todoLists;

    projectTodos.forEach((todo) => {
        const newTodoElement = createTodoCard(
            todo,
            onItemDelete,
            onItemToggle,
            onItemAdd,
            onChecklistAdd
        );
        todoContainer.appendChild(newTodoElement);
    });
}
