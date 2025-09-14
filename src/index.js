import "./styles.css";
import "js-circle-progress";
import Repository from "./repository";
import LocalStorageService from "./services/LocalStorageService";
import Project from "./models/Project";
import { initProjectDialog } from "./ui/ProjectDialog.js";
import { updateProjectNav } from "./ui/ProjectList.js";

document.addEventListener("DOMContentLoaded", () => {
    const projectRepository = new Repository(LocalStorageService);

    initProjectDialog((projectName) => {
        const newProject = new Project(projectName);
        projectRepository.addProject(newProject);
        updateProjectNav(projectRepository);
    });

    updateProjectNav(projectRepository);
});
