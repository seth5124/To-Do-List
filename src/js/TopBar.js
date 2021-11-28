import { editElement } from "./EditElement.js";
import { getHomeProject } from "./DB.js";
import { DeleteProjectForm } from "./DeleteProjectForm.js";
import { showPopup } from "./popup.js";

/**
 * Render the top bar with the active project name and option to delete the project
 * @param {Project} project - Project from whihc to pull info
 * @returns {HTMLDivElement} HTMLDivElement - Top bar element
 */
export function TopBar(project) {
  let topBar = document.createElement("div");
  topBar.id = "topBar";

  let topBarTitle = document.createElement("h1");
  topBarTitle.classList.add("topBarTitle");
  topBarTitle.innerHTML = project.name;

  let deleteProjectButton;
  if(project.name != getHomeProject().name){
    topBarTitle.classList.add('editable');
    topBarTitle.addEventListener('dblclick', () =>{
      editElement(topBarTitle, ()=>{
        document.dispatchEvent(new CustomEvent('projectChanged',{detail: project}));
      },(newName)=>{
        project.name = newName;
      })
    })
    
    let deleteProjectButton = document.createElement('button');
    deleteProjectButton.innerHTML = 'X';
    deleteProjectButton.classList.add('deleteProjectButton');
    deleteProjectButton.addEventListener('click',()=>{
      showPopup(DeleteProjectForm(project));
    })
    topBar.appendChild(deleteProjectButton);
  }

  topBar.appendChild(topBarTitle);

  return topBar;
}
