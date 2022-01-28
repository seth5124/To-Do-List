import { Project } from "./project.js";
import { Sidebar } from "./Sidebar.js";
import {getProjects, getHomeProject,getExistingTags, addExistingTag, removeExistingTag} from "./DB.js";
import { DateCards } from "./DateCards.js";
import { TopBar } from "./TopBar.js";
import "../css/styles.css";
import { closePopup, showPopup } from "./popup.js";
import { TaskCard } from "./TaskCard.js";

//Initializes the active project as the Home project
let activeProject = getHomeProject();

//Initializes all UI elements
let content = document.getElementById("content");
content.appendChild(TopBar(activeProject));
content.appendChild(Sidebar(getProjects()));
content.appendChild(DateCards(activeProject));
makeProjectEntryActive(activeProject);

//projectChanged event fires any time project data needs to be updated
//Updates all UI elements involving project data
document.addEventListener("projectChanged", (event) => {
    let project = event.detail;
    activeProject = project;
    updateTopBar(project);
    updateSidebar();
    updateDateCards(activeProject);
    makeProjectEntryActive(activeProject);
});


//tasksUpdated event fires any time task data changes
//Updates all UI elements involving task data
//Optional to pass in a project for this but defaults to the active project
document.addEventListener("tasksUpdated", (event) => {
    let project = event.detail ? event.detail : activeProject;
    updateDateCards(project);
});

document.addEventListener('tagsUpdated',(event)=>{
    if(event.detail){
        updateTaskCard(event.detail.task); 
    }
    updateSidebar();
})


/**
 * Reloads Sidebar element with latest project data
 */
function updateSidebar() {
    content.replaceChild(
        Sidebar(getProjects()),
        document.getElementById("sideBar")
    );
}

/**
 * Reloads date cards with latest task data from given project
 * @param {Project} project - Project to pull task data from
 */
function updateDateCards(project) {
    content.replaceChild(
        DateCards(project),
        document.getElementById("DateCards")
    );
}

/**
 * Reloads top bar with latest project data
 */
function updateTopBar() {
    let topBar = document.getElementById("topBar");
    topBar.replaceWith(TopBar(activeProject));
}

function updateTaskCard(task){
    closePopup();
    showPopup(TaskCard(task))
}

/**
 * Highlights the sidebar entry for the given project
 * @param {Project} project - Project to make active
 */
function makeProjectEntryActive(project) {
    let projectEntries = Array.from(
        document.getElementById("projectList").children
    );
    for (let projectEntry in projectEntries) {
        let entry = projectEntries[projectEntry];
        if (entry.getAttribute("project") == project.name) {
            entry.classList.add("active");
        } else {
            entry.classList.remove("active");
        }
    }
}
