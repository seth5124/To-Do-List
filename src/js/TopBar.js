import { editElement } from "./EditElement.js";

export function TopBar(project) {
  let topBar = document.createElement("div");
  topBar.id = "topBar";

  let topBarTitle = document.createElement("h1");
  topBarTitle.classList.add("topBarTitle");
  let name = project.name;
  topBarTitle.innerHTML = name;
  topBarTitle.addEventListener('dblclick', () =>{
    editElement(topBarTitle, ()=>{
      document.dispatchEvent(new CustomEvent('projectChanged',{detail: project}));
    },(newName)=>{
      project.name = newName;
    })
  })
  topBar.appendChild(topBarTitle);

  return topBar;
}
