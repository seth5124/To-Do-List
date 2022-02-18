import { addTaskToProject } from "./DB.js";
import { closePopup } from "./popup.js";
import { Task } from "./task.js";
import { Project } from "./project.js";
import { parse, format, isValid, differenceInYears } from "date-fns";

/**
 * Renders form to add a new task to a given project
 * @param {Project} project - Project to add the task to
 * @param {Date} date - Task's due date if this is already defined. Defaults to undefined
 * @returns {HTMLDivElement} Div containing the form
 */
export function NewTaskForm(project, date = undefined) {
  let newTaskForm = document.createElement("div");

  let formHeader = document.createElement("h1");
  formHeader.innerHTML = `Add New Task in ${project.name}`;
  newTaskForm.appendChild(formHeader);

  let nameInput = document.createElement("input");
  nameInput.placeholder = "Task Name";
  newTaskForm.appendChild(nameInput);

  let descriptionInput = document.createElement("input");
  descriptionInput.placeholder = "Description...";
  newTaskForm.appendChild(descriptionInput);

  let priorityInput = document.createElement("select");
  priorityInput.placeholder = "Priority";
  priorityInput.appendChild(
    Object.assign(document.createElement("option"), {
      innerHTML: "Priority",
      value: "Priority",
    })
  );
  let priorities = [
    { name: "Emergency", value: 0 },
    { name: "Urgent", value: 1 },
    { name: "Routine", value: 2 },
  ];
  for (let priority in priorities) {
    let option = document.createElement("option");
    option.value = priorities[priority].value;
    option.innerHTML = priorities[priority].name;
    priorityInput.appendChild(option);
  }
  newTaskForm.appendChild(priorityInput);

  let dateInput = document.createElement("input");
  dateInput.type = "date";
  if (date) {
    dateInput.value = format(new Date(date), "yyyy-MM-dd");
  }
  newTaskForm.appendChild(dateInput);

  let submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerHTML = "Add";
  submitButton.addEventListener("click", () => {
    let name = nameInput.value;
    let description = descriptionInput.value;
    let dueDate = dateInput.value;
    let priority = priorityInput.value;

    if (name.length < 1) {
      alert("Name cannot be blank");
      return;
    }

    if (!isValidDate(dueDate)) {
      alert("Invalid date");
      return;
    } else {
      dueDate = parse(dueDate, "yyyy-MM-dd", new Date());
    }
    if (priority == "Priority") {
      alert("Please select a priority");
      return;
    }
    let task = new Task(name, description, dueDate, priority);

    addTaskToProject(project, task);

    document.dispatchEvent(
      new CustomEvent("tasksUpdated", { detail: project })
    );

    closePopup();
  });
  newTaskForm.appendChild(submitButton);

  let closeButton = document.createElement("button");
  closeButton.classList.add("closeFormButton");
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", () => {
    closePopup();
  });
  newTaskForm.appendChild(closeButton);
  return newTaskForm;
}
function isValidDate(date) {
  date = parse(date, "yyyy-MM-dd", new Date());
  if (isValid(date)) {
    let yearsFromToday = differenceInYears(date, new Date());
    if (yearsFromToday > -100 && yearsFromToday < 100) {
      return true;
    }
  }
  return false;
}
