//TODO: Add click away functionality to clear submenu

import { DateCards } from "./DateCards.js";
import { NewProjectForm } from "./NewProjectForm.js";
import { getProjects } from "./DB.js";
import { showPopup } from "./popup.js";

export function Sidebar() {
  //Creates Sidebar div
  let sidebar = document.createElement("div");
  sidebar.id = "sideBar";
  let projectList = document.createElement("ul");
  projectList.id = "projectList";
  sidebar.appendChild(projectList);

  /*Pulls each exisitng project and adds an 
      entry div to the sidebar with its name*/
  let projects = getProjects();
  for (let project in projects) {
    sidebar.appendChild(ProjectEntry(projects[project]));
  }
  sidebar.appendChild(NewProjectButton());
  return sidebar;
}

/**Creates a projectEntry div for adding new projects
 * */
function NewProjectButton() {
  let button = document.createElement("div");
  button.classList.add("projectEntry");
  let buttonText = document.createElement("h3");
  buttonText.innerHTML = "+";
  button.appendChild(buttonText);
  button.addEventListener("click", () => {
    showPopup(NewProjectForm());
  });

  return button;
}

/**
 *
 * @param {Project} project
 * @returns {HTMLDivElement} Div containing the project sidebar entry
 */
function ProjectEntry(project) {
  let projectEntry = document.createElement("div");
  projectEntry.classList.add("projectEntry");
  projectEntry.project = project;
  projectEntry.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent("projectChanged", { detail: projectEntry.project })
    );
  });

  //Project title div in side bar
  let projectHeader = document.createElement("div");
  projectHeader.classList.add("projectHeader");

  //h1 element containing the text of the project title
  let projectHeaderName = document.createElement("h3");
  projectHeaderName.innerHTML = project.name;

  projectHeader.appendChild(projectHeaderName);
  projectEntry.appendChild(projectHeader);

  return projectEntry;
}
