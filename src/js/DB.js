import { Project } from "./project.js";
import { Task } from "./task.js";
import { v4 as uuidv4 } from "uuid";

//This is a project object containing all the tasks under Home
let homeProject = new Project({ name: uuidv4(), isHomeProject: true });

//Project List service as the "database". This will at some point be replaced by an actual database
let projects = {};
addProject(homeProject);

/**
 * Adds a project to the database
 * @param {Project} project - Project object to add to the database
 */
export function addProject(project) {
  if (!(project instanceof Project)) {
    console.log(`Not a project`);
    return;
  }
  projects[project.id] = project;
}

/**
 * Iterates through each project's tasks and returns a set of all tags that exist
 * @returns List of tags that exist across all tasks across all projects
 */
export function getExistingTags() {
  let existingTags = [];
  let projects = getProjects();
  for (let project in projects) {
    let tasks = projects[project].tasks;
    for (let task in tasks) {
      let tags = tasks[task].tags;
      for (let tag in tags) {
        if (!existingTags.includes(tags[tag])) {
          existingTags.push(tags[tag]);
        }
      }
    }
  }

  return existingTags;
}
/**
 * Gets projects from the database
 * @returns {Object} Object containing project list
 */
export function getProjects() {
  return projects;
}

/**
 * Gets the Home project
 * @returns {Project} Project - Home project
 */
export function getHomeProject() {
  return homeProject;
}

/**
 * Deletes a project from the database
 * @param {Project} project - Project to delete
 */
export function deleteProject(project) {
  delete projects[project.id];
}
/**
 * Adds a task to a given project
 * @param {Project} project - Project to add the task to
 * @param {Task} task - Task to add to the project
 */
export function addTaskToProject(project, task) {
  project.addTask(task);
}

/**
 * Removes a task from a given project
 * @param {Project} project - Project to remove task from
 * @param {Task} task - task to remove
 */
export function removeTaskFromProject(project, task) {
  project.removeTask(task);
}

/**
 * Deletes given task
 * @param {Task} taskToDelete Specifies task being deleted
 */
export function deleteTask(taskToDelete) {
  let projects = getProjects();
  for (let project in projects) {
    project = projects[project];
    let tasks = project.tasks;
    for (let task in tasks) {
      task = tasks[task];
      if (task.id == taskToDelete.id) {
        project.removeTask(task);
      }
    }
  }
}

/**
 * Gets a list of tasks across all projects that have the specififed tag
 * @param {Tag} tag Tag to check for
 * @returns List of tasks with given tag
 */
export function tasksWithTag(tag) {
  let tasksWithTag = [];
  let projects = getProjects();
  for (let project in projects) {
    let tasks = projects[project].tasks;
    for (let task in tasks) {
      if (tasks[task].tags.includes(tag)) {
        tasksWithTag.push(tasks[task]);
      }
    }
  }
  return tasksWithTag;
}
