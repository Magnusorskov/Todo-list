import "./styles.css";
import "js-circle-progress";
import Repository from "./repository";
import LocalStorageService from "./services/LocalStorageService";
import Project from "./models/Project";
import Todo from "./models/Todo";
import { initProjectDialog } from "./ui/ProjectDialog.js";
import { updateProjectNav } from "./ui/ProjectList.js";
import { updateTodoList } from "./ui/TodoList.js";
import { initTodoDialog } from "./ui/TodoDialog.js";

document.addEventListener("DOMContentLoaded", () => {
    // --- STATE MANAGEMENT --- //
    const projectRepository = new Repository(LocalStorageService);
    const appState = {
        selectedProjectId: null,
    };

    // --- HANDLER FUNCTIONS ("The Brain") --- //

    function handleProjectSelect(projectId) {
        appState.selectedProjectId = projectId;
        const currentProject = projectRepository.findProject(projectId);
        updateTodoList(
            currentProject,
            handleItemDelete,
            handleItemToggle,
            handleItemAdd,
            handleChecklistAdd
        );
        updateProjectNav(
            projectRepository,
            appState,
            handleProjectSelect,
            handleProjectDelete
        );
    }

    function handleProjectDelete(project) {
        projectRepository.deleteProject(project);
        if (appState.selectedProjectId === project.id) {
            appState.selectedProjectId = null;
            updateTodoList(
                null,
                handleItemDelete,
                handleItemToggle,
                handleItemAdd,
                handleChecklistAdd
            );
        }
        updateProjectNav(
            projectRepository,
            appState,
            handleProjectSelect,
            handleProjectDelete
        );
    }

    function handleNewProject(projectName) {
        const newProject = new Project(projectName);
        projectRepository.addProject(newProject);
        handleProjectSelect(newProject.id);
    }

    function handleNewTodo(todoData) {
        if (!appState.selectedProjectId) {
            alert("Please select a project before adding a todo!");
            return;
        }
        const project = projectRepository.findProject(appState.selectedProjectId);
        if (!project) return;

        const newTodo = new Todo(
            todoData["todo-title"],
            todoData["todo-description"],
            todoData["todo-dueDate"],
            todoData["todo-urgency"],
            todoData["todo-note"]
        );
        project.todoLists.push(newTodo);
        projectRepository.save(); // Force save
        handleProjectSelect(project.id); // Re-render
    }

    function findTodo(todoId) {
        const project = projectRepository.findProject(appState.selectedProjectId);
        if (!project) return null;
        const todo = project.todoLists.find((t) => t.id === todoId);
        return todo ? { project, todo } : null;
    }

    function findChecklist(checklistId) {
        const project = projectRepository.findProject(appState.selectedProjectId);
        if (!project) return null;
        for (const todo of project.todoLists) {
            const checklist = todo.checkLists.find((cl) => cl.id === checklistId);
            if (checklist) {
                return { project, checklist };
            }
        }
        return null;
    }

    function findItemAndChecklist(itemId, checklistId) {
        const result = findChecklist(checklistId);
        if (!result) return null;
        const { project, checklist } = result;
        const item = checklist.findItem(itemId);
        return item ? { project, checklist, item } : null;
    }

    function handleChecklistAdd(category, todoId) {
        const found = findTodo(todoId);
        if (found) {
            found.todo.addChecklist(category);
            projectRepository.save(); // Force save
            handleProjectSelect(found.project.id); // Re-render
        }
    }

    function handleItemAdd(description, checklistId) {
        const found = findChecklist(checklistId);
        if (found) {
            found.checklist.addItem(description);
            projectRepository.save(); // Force save
            handleProjectSelect(found.project.id); // Re-render
        }
    }

    function handleItemDelete(itemId, checklistId) {
        const found = findItemAndChecklist(itemId, checklistId);
        if (found) {
            found.checklist.deleteItem(itemId);
            projectRepository.save(); // Force save
            handleProjectSelect(found.project.id); // Re-render
        }
    }

    function handleItemToggle(itemId, checklistId, isCompleted) {
        const found = findItemAndChecklist(itemId, checklistId);
        if (found) {
            found.item.completed = isCompleted;
            projectRepository.save(); // Force save
            handleProjectSelect(found.project.id); // Re-render
        }
    }

    // --- INITIALIZATION & WIRING --- //

    initProjectDialog(handleNewProject);
    initTodoDialog(handleNewTodo);

    if (projectRepository.projects.length > 0) {
        handleProjectSelect(projectRepository.projects[0].id);
    } else {
        updateProjectNav(
            projectRepository,
            appState,
            handleProjectSelect,
            handleProjectDelete
        );
        updateTodoList(
            null,
            handleItemDelete,
            handleItemToggle,
            handleItemAdd,
            handleChecklistAdd
        );
    }
});
