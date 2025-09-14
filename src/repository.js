import Checklist from "./models/Checklist";
import Todo from "./models/Todo";
import Project from "./models/Project";

export default class Repository {
    project_key = "todo-app-projects";
    projects;
    storageService;

    constructor(storageService) {
        this.storageService = storageService;
        const plainProjects =
            this.storageService.loadData(this.project_key) || [];
        this.projects = this.rehydrateProjects(plainProjects);
    }

    addProject(project) {
        this.projects.push(project);
        this.storageService.saveData(this.project_key, this.projects);
    }

    findProject(id) {
        return this.projects.find((project) => project.id === id);
    }

    deleteProject(projectToDelete) {
        this.projects = this.projects.filter(
            (project) => project !== projectToDelete
        );
        this.storageService.saveData(this.project_key, this.projects);
    }

    get projects() {
        return this.projects;
    }

    rehydrateProjects(plainProjects) {
        if (!plainProjects) {
            return [];
        }
        return plainProjects.map((p) => {
            const rehydratedTodos = this.rehydrateTodos(p.todoLists);
            return new Project(p.name, rehydratedTodos);
        });
    }

    rehydrateTodos(plainTodos = []) {
        if (!plainTodos) {
            return [];
        }
        return plainTodos.map((td) => {
            const rehydratedChecklists = this.rehydrateChecklists(
                td.checkLists
            );
            return new Todo(
                td.title,
                td.description,
                td.dueDate,
                td.urgency,
                td.note,
                td.id,
                rehydratedChecklists
            );
        });
    }

    rehydrateChecklists(plainChecklists = []) {
        if (!plainChecklists) {
            return [];
        }
        return plainChecklists.map((plainChecklist) => {
            return new Checklist(plainChecklist.category);
        });
    }
}
