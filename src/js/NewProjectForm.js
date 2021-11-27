import { addProject,getProjects } from "./DB.js";
import { closePopup } from "./popup.js";
import { Project } from "./project.js";

/**
 * Form to add a new project to the database
 * @returns {HTMLDivElement} Div containing the form
 */
export function NewProjectForm() {
    let newProjectForm = document.createElement("div");
    newProjectForm.id = "popup";

    let formHeader = document.createElement("h1");
    formHeader.innerHTML = "Add New Project";
    newProjectForm.appendChild(formHeader);

    let nameInput = document.createElement("input");
    nameInput.placeholder = "Project Name";
    newProjectForm.appendChild(nameInput);

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Add";
    submitButton.addEventListener("click", () => {
        let name = nameInput.value;
        if(name.length < 1){
            alert("Project name cannot be blank!");
            return;
        }
        let project = new Project(name);
        if(getProjects()[name]){
            alert("This project already exists");
            return;
        }
        addProject(project);
        document.dispatchEvent(
            new CustomEvent("projectChanged", { detail: project })
        );
        closePopup();
    });
    newProjectForm.appendChild(submitButton);

    let closeButton = document.createElement("button");
    closeButton.classList.add("closeFormButton");
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", () => {
        closePopup();
    });
    newProjectForm.appendChild(closeButton);

    return newProjectForm;
}
