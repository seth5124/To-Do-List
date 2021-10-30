import { addProject } from "./DB.js";
import { closePopup } from "./popup.js";
import { Project } from "./project.js";

export function NewProjectForm() {
  //Div element housing the form elemnets
  let newProjectForm = document.createElement("div");
  newProjectForm.id = "popup";

  //Form header in an h1 tag
  let formHeader = document.createElement("h1");
  formHeader.innerHTML = "Add New Project";
  newProjectForm.appendChild(formHeader);

  //Text input element
  let nameInput = document.createElement("input");
  nameInput.placeholder = "Project Name";
  newProjectForm.appendChild(nameInput);

  //Submit Button
  let submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerHTML = "Add";
  submitButton.addEventListener("click", () => {
    let name = nameInput.value;
    addProject(new Project(name));

    document.dispatchEvent(new Event("projectsUpdated"));
    document.getElementById("popup").remove();
    document.getElementById("content").classList.toggle("blur");
  });
  newProjectForm.appendChild(submitButton);

  //Close button
  let closeButton = document.createElement("button");
  closeButton.classList.add("closeFormButton");
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", () => {
    closePopup();
  });
  newProjectForm.appendChild(closeButton);
  return newProjectForm;
}
