import { editElement } from "./EditElement.js";
import { getHomeProject } from "./DB.js";
import { DeleteProjectForm } from "./DeleteProjectForm.js";
import { showPopup } from "./popup.js";

export function TopBar(project) {
  let topBar = document.createElement("div");
  topBar.id = "topBar";

  let topBarTitle = document.createElement("h1");
  topBarTitle.classList.add("topBarTitle");
  topBarTitle.innerHTML = project.name;

  let deleteProjectButton;
  if(project.name != getHomeProject().name){
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
