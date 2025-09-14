function initProjectDialog(onSubmit) {
    const projectDialog = document.querySelector(".project-dialog");
    const projectForm = document.querySelector(".project-dialog__form");
    const newProjectButton = document.querySelector(".add-project-button");
    const closeProjectDialog = document.querySelector(
        ".project-dialog__button--cancel"
    );

    newProjectButton.addEventListener("click", () => {
        projectDialog.showModal();
    });

    closeProjectDialog.addEventListener("click", () => {
        projectDialog.close();
    });

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const projectData = Object.fromEntries(formData);
        onSubmit(projectData["project-name"]);
        event.target.reset();
        projectDialog.close();
    });
}

export { initProjectDialog };
