export default class Repository {
    project_key = "todo-app-projects";
    projects;

    constructor(storageService) {}

    addProject(project) {
        const currentProjects = storageService.loadData(project_key) || [];
    }

    rehydrateChecklist() {}
}
