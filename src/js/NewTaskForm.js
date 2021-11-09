import { addTaskToProject } from "./DB.js";
import { closePopup } from "./popup.js";
import { Task } from "./task.js";

export function NewTaskForm(project) {
  //Div element housing the form elemnets
  let newTaskForm = document.createElement("div");
  newTaskForm.id = "popup";

  //Form header in an h1 tag
  let formHeader = document.createElement("h1");
  formHeader.innerHTML = `Add New Task in ${project.name}`;
  newTaskForm.appendChild(formHeader);

  //Name Input
  let nameInput = document.createElement("input");
  nameInput.placeholder = "Task Name";
  newTaskForm.appendChild(nameInput);

  //Description Input
  let descriptionInput = document.createElement("input");
  descriptionInput.placeholder = "Description...";
  newTaskForm.appendChild(descriptionInput);

  //Due date element
  let dateInput = document.createElement("input");
  dateInput.type = "date";
  newTaskForm.appendChild(dateInput);

  //Submit Button
  let submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerHTML = "Add";
  submitButton.addEventListener("click", () => {
    //Creates task object from input values
    let name = nameInput.value;
    let description = descriptionInput.value;
    let dueDate = new Date(dateInput.value);
    let task = new Task(name, description, dueDate);

    //Adds task to current project
    addTaskToProject(project, task);

    //Triggers the task card list to re-render
    document.dispatchEvent(
      new CustomEvent("tasksUpdated", { detail: project })
    );
    
    closePopup();
  });
  newTaskForm.appendChild(submitButton);

  //Close button
  let closeButton = document.createElement("button");
  closeButton.classList.add("closeFormButton");
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", () => {
    closePopup();
  });
  newTaskForm.appendChild(closeButton);
  return newTaskForm;
}
