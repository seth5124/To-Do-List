import { NewProjectForm } from "./NewProjectForm.js";
import { getProjects,getHomeProject, getExistingTags } from "./DB.js";
import { showPopup } from "./popup.js";
import homeIcon from '../assets/home.svg';
import { Project } from "./project.js";

/**
 * Renders sidebar containing entries for each project
 * @returns {HTMLDivElement} Sidebar Div element
 */
export function Sidebar() {

  
  let sidebar = Object.assign(document.createElement("div"),{
    id: 'sideBar'
  })
  let projectList = Object.assign(document.createElement("ul"),{
    id: 'projectList',
  })

  
  let projects = getProjects();
  for (let project in projects) {
    projectList.appendChild(ProjectEntry(projects[project]));

  }
  sidebar.appendChild(projectList);
  sidebar.appendChild(NewProjectButton());
  sidebar.appendChild(existingTagsList());
  return sidebar;
}

/**
 * Renders the 'New project button' to append at the botton of the sidebar
 * @returns {HTMLDivElement} Div element
 */
function NewProjectButton() {
  let button = Object.assign(document.createElement('div'),{
    classList: 'projectEntry',
  })
  let buttonText = Object.assign(document.createElement('h3'),{
    innerHTML: '+',
  })
  button.appendChild(buttonText);
  button.addEventListener("click", () => {
    showPopup(NewProjectForm());
  });

  return button;
}

/**
 * Renders a single project entry for the sidebar
 * @param {Project} project
 * @returns {HTMLDivElement} Div containing the project sidebar entry
 */
function ProjectEntry(project) {
  let projectEntry = Object.assign(document.createElement('div'),{
    classList: 'projectEntry',
    project: project.name,
  })
  projectEntry.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent("projectChanged", { detail: project })
    );
  });

  let projectHeader = Object.assign(document.createElement('div'),{
    classList: 'projectHeader',
  })
  let projectHeaderName;
  
  if(project.name == getHomeProject().name){
    projectHeaderName = Object.assign(document.createElement('img'),{
      src: homeIcon,
      classList: 'homeIcon',
    })
  }
  else{
    projectHeaderName = Object.assign(document.createElement('h3'),{
      innerHTML: project.name,
    })
  }

  projectHeader.appendChild(projectHeaderName);
  projectEntry.appendChild(projectHeader);

  return projectEntry;
}

function existingTagsList(){

  let tags = getExistingTags();
  let tagList = document.createElement('ul');
  tagList.classList.add('sidebarTagList'); 
  for(let tag in tags){
    tag = tags[tag];
    let tagEntry = document.createElement('div');
    tagEntry.classList.add('sidebarTagEntry');
    tagEntry.innerHTML = tag;
    tagEntry.addEventListener('click',()=>{
      let tasksWithTag = []
      let projects = getProjects();
      for(let project in projects){
        let tasks = projects[project].tasks
        for(let task in tasks){
          if(tasks[task].tags.includes(tag)){
            tasksWithTag.push(tasks[task]);
          }
        }
      }
      
      document.dispatchEvent(new CustomEvent("projectChanged", { detail:new Project(`Tasks With Tag: ${tag}`,tasksWithTag) }));
    })
    tagList.appendChild(tagEntry);
  }
  return tagList;
}

