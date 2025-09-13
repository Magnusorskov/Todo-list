import Project from "../models/Project";

export function projectFormEventListener(projectRepository) {
    const projectForm = document.querySelector(".project-dialog__form");
    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const projectData = Object.fromEntries(formData);

        const newProject = new Project(projectData["project-name"]);
        projectRepository.addProject(newProject);
        updateProjectNav(projectRepository);
    });
}

export function updateProjectNav(projectRepository) {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.innerHTML = "";
    const activeProjects = projectRepository.projects;

    activeProjects.forEach((project) => {
        const newProjectElement = createProjectElement(project);
        projectsContainer.appendChild(newProjectElement);
    });
}

export function createProjectElement(project) {
    const newProjectLi = document.createElement("li");

    const projectName = document.createElement("button");
    projectName.textContent = project.name;

    const progressCircle = document.createElement("circle-progress");
    progressCircle.setAttribute(
        "value",
        project.calculateProgressInPercentage().toString()
    );
    progressCircle.setAttribute("max", "100");
    progressCircle.setAttribute("text-format", "none");

    newProjectLi.appendChild(projectName);
    newProjectLi.appendChild(progressCircle);
    return newProjectLi;
}
