import Project from "../models/Project";

export default function projectForm(projectRepository) {
    const projectForm = document.querySelector(".project-dialog__form");
    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const projectData = Object.fromEntries(formData);
        projectRepository.addProject(new Project(projectData["project-name"]));
        console.log(projectRepository.projects);
    });
}
