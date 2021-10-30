//TODO: Add click away functionality to clear submenu

import { DateCards } from "./DateCards.js";
import { NewProjectForm } from "./NewProjectForm.js";
import { getProjects } from "./DB.js";
import { showPopup } from "./popup.js";
import { isToday, isTomorrow } from "./DateUtilities.js";


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
  button.addEventListener("click", () =>{
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
  let addSubMenuFunc = addSubMenu.bind(projectEntry);
  projectEntry.addEventListener("click", addSubMenuFunc);
  projectEntry.addEventListener("click", () => {
    replaceDateCards(project);
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

  /**
   * Spawns submenu on bound project enry
   * Must be bound to a project entry first
   */
  function addSubMenu() {
    if (this.children.length == 1) {
      this.appendChild(SubMenu(this.project));
    } else {
      while (this.children.length > 1) {
        this.removeChild(this.lastChild);
      }
    }

    /**
 * Renders dropdown list of dates containing tasks
  for a given project
 * @param {Project} project 
 * @returns Div
 */
  }
}

/**
 *
 */
function replaceDateCards(project) {
  let content = document.getElementById("content");
  let existingDateCards = document.getElementById("DateCards");
  if (existingDateCards) {
    existingDateCards.replaceWith(DateCards(project));
  } else {
    content.appendChild(DateCards(project));
  }
}

function SubMenu(project) {
  let subMenuContainer = document.createElement("div");
  subMenuContainer.classList.add("subMenuContainer");
  let subMenu = document.createElement("ul");
  let subMenuItems = [];
  subMenu.classList.add("subMenu");

  subMenuContainer.appendChild(subMenu);

  /*Iterates through each date containing tasks
    Generates a submenu for the given project */
  for (let date in project.tasksByDate()) {
    if (!(date in subMenu)) {
      let subMenuItem = document.createElement("li");
      subMenuItem.classList.add("subMenuItem");
      if (isToday(new Date(date))) {
        subMenuItem.innerHTML = "Today";
      } else if (isTomorrow(new Date(date))) {
        subMenuItem.innerHTML = "Tomorrow";
      } else {
        date = new Date(date);
        subMenuItem.innerHTML = `${date.getMonth() + 1}/${date.getDate() + 1}`;
      }
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(date).getTime() - today.getTime() < 0) {
        subMenuItem.classList.add("subMenuPastDue");
      }
      subMenu.appendChild(subMenuItem);
    }
  }
  return subMenuContainer;
}
