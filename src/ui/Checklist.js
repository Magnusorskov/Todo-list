function createChecklistItemElement(
    item,
    checklistId,
    onItemDelete,
    onItemToggle
) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("checkbox-container");
    if (item.completed) {
        itemContainer.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.id = item.id;
    checkbox.addEventListener("change", () => {
        onItemToggle(item.id, checklistId, checkbox.checked);
    });

    const label = document.createElement("label");
    label.textContent = item.description;
    label.setAttribute("for", item.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-item-button");
    deleteButton.addEventListener("click", () => {
        onItemDelete(item.id, checklistId);
    });

    itemContainer.appendChild(checkbox);
    itemContainer.appendChild(label);
    itemContainer.appendChild(deleteButton);
    return itemContainer;
}

export function createChecklistElement(
    checklist,
    onItemDelete,
    onItemToggle,
    onItemAdd
) {
    const checklistElement = document.createElement("div");
    checklistElement.classList.add("checklist");

    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = checklist.category;
    checklistElement.appendChild(categoryTitle);

    checklist.items.forEach((item) => {
        const itemElement = createChecklistItemElement(
            item,
            checklist.id,
            onItemDelete,
            onItemToggle
        );
        checklistElement.appendChild(itemElement);
    });

    const addItemButton = document.createElement("button");
    addItemButton.textContent = "+ Add Item";
    addItemButton.classList.add("add-item-button");
    addItemButton.addEventListener("click", () => {
        const newItemDescription = prompt("Enter new item description:");
        if (newItemDescription) {
            onItemAdd(newItemDescription, checklist.id);
        }
    });

    checklistElement.appendChild(addItemButton);

    return checklistElement;
}