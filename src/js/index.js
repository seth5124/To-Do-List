import { Project } from "./project.js";
import { Sidebar } from "./Sidebar.js";
import { addProject, getProjects } from "./DB.js";
import { DateCards } from "./DateCards.js";
import { TopBar } from "./TopBar.js";
import "../css/styles.css";

let mainProject = new Project("Main Project");
addProject(mainProject);

let activeProject = mainProject;

let content = document.getElementById("content");
content.appendChild(TopBar(activeProject));
content.appendChild(Sidebar(getProjects()));
content.appendChild(DateCards(activeProject));
makeProjectEntryActive(activeProject);

document.addEventListener("projectChanged", (event) => {
  let project = event.detail;
  activeProject = project;
  updateTopBar();
  updateSidebar();
  updateDateCards(activeProject);
  makeProjectEntryActive(activeProject);
  

});

document.addEventListener("tasksUpdated", (event) => {
  let project = event.detail ? event.detail : activeProject;
  updateDateCards(project);
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

function updateTopBar() {
  let topBar = document.getElementById("topBar");
  topBar.replaceWith(TopBar(activeProject));
}

function makeProjectEntryActive(project){
  let projectEntries = Array.from(document.getElementById('projectList').children);
  for(let projectEntry in projectEntries){
    let entry = projectEntries[projectEntry];
    if(entry.getAttribute('project') == project.name){
      entry.classList.add('active');
    }
    else{
      entry.classList.remove('active');
    }
  }

}
