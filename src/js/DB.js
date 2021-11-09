import { Project } from "./project.js";

let projects = {};

export function addProject(project) {
  if (!(project instanceof Project)) {
    console.log(`Not a project`);
    return;
  }
  projects[project.name] = project;
}

export function getProjects() {
  return projects;
}

export function addTaskToProject(project, task) {
  project.addTask(task);
}

export function removeTaskFromProject(project, task) {
  project.removeTask(project.getTaskIndex(task));
}
