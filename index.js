import { Project } from "./project.js";
import { Sidebar } from "./Sidebar.js";
import { addProject, getProjects, addTaskToProject } from "./DB.js";
import { DateCards } from "./DateCards.js";
import { TopBar } from "./TopBar.js";

let mainProject = new Project("Main Project");
addProject(mainProject);

let activeProject = mainProject;


let content = document.getElementById("content");
content.appendChild(TopBar(activeProject));
content.appendChild(Sidebar(getProjects()));
content.appendChild(DateCards(activeProject))

document.addEventListener("projectChanged", (event) => {
  let project = event.detail;
  activeProject = project;
  console.log(`Project has changed. Active project should now be ${activeProject.name}`);
  updateTopBar();
  updateSidebar();
  updateDateCards(project);
  
});

document.addEventListener("tasksUpdated", (event) => {
  let project = event.detail;
  activeProject = project;
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
function updateTopBar(){
  let topBar = document.getElementById('topBar');
  topBar.replaceWith(TopBar(activeProject));
}


