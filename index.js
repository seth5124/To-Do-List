import { Project } from "./project.js";
import { Task } from "./task.js";
import { Sidebar } from "./Sidebar.js";
import { addProject, getProjects, addTaskToProject } from "./DB.js";
import { DateCards } from "./DateCards.js";

let mainProject = new Project("Main project");
addProject(mainProject);
//addTaskToProject(mainProject, new Task('Default Task',"Task spawned by default", new Date(9,14,2021)));

let content = document.getElementById("content");
content.appendChild(Sidebar(getProjects()));

document.addEventListener("projectsUpdated", () => {
  updateSidebar();
});

document.addEventListener("tasksUpdated", (event) => {
  let project = event.detail;
  updateDateCards(project);
  updateSidebar();
});

function updateSidebar() {
  content.replaceChild(
    Sidebar(getProjects()),
    document.getElementById("sideBar")
  );
}

function updateDateCards(project) {
  content.replaceChild(
    DateCards(project),
    document.getElementById("DateCards")
  );
}

