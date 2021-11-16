import { deleteProject, getHomeProject } from "./DB";
import { closePopup } from "./popup";

export function DeleteProjectForm(project) {
    let deleteFormPrompt = document.createElement("div");
    let deleteFormHeader = document.createElement('h1');
    deleteFormHeader.innerHTML = `Delete ${project.name}?`;
    deleteFormPrompt.appendChild(deleteFormHeader);
    let yesButton = document.createElement("button");
    yesButton.innerHTML='Yes';
    let noButton = document.createElement("button");
    noButton.innerHTML = 'No'

    yesButton.addEventListener('click',()=>{
        deleteProject(project);
        document.dispatchEvent(new CustomEvent('projectChanged', {detail: getHomeProject()}));
        closePopup();

    })
    noButton.addEventListener('click',()=>{
        closePopup();
    })

    deleteFormPrompt.appendChild(yesButton);
    deleteFormPrompt.appendChild(noButton);

    return deleteFormPrompt;
}
