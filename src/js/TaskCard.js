import { closePopup } from "./popup.js";
import { format, parse } from "date-fns";
import { editElement } from "./EditElement.js";
import pencilSVG from "../assets/pencil.svg";

/**
 * Creates a task card for the given task
 * @param {Task} Task
 * @returns Div containing a task card popup containing the task details
 */
export function TaskCard(task) {
  //Creates task card
  let taskCard = document.createElement("div");

  //h1 tag for task title and due date
  let taskHeader = document.createElement("div");
  let taskTitle = document.createElement("h1");
  taskTitle.classList.add("taskHeaderElement");
  task.isDone ? taskTitle.classList.toggle('checkedOff'): {};

  //Not implemented fully
  //Will allow editing of the task title
  taskTitle.addEventListener("dblclick", () => {
    editElement(
      taskTitle,
      () => {
        taskTitle.innerHTML = `${task.name}`;
        document.dispatchEvent(new CustomEvent("tasksUpdated"));
      },
      (newName) => {
        task.name = newName;
      }
    );
  });
  taskTitle.innerHTML = `${task.name}`;

  /**
   * Task title and due date are seperate elements
   * so they can be clicked and edited individually
   */
  let taskDueDate = document.createElement("h1");
  taskDueDate.classList.add("taskHeaderElement");
  taskDueDate.innerHTML = format(task.dueDate, "M/d");
  taskDueDate.addEventListener("dblclick", () => {
    editElement(
      taskDueDate,
      () => {
        taskDueDate.innerHTML = format(task.dueDate, "M/d");
        document.dispatchEvent(new CustomEvent("tasksUpdated"));
      },
      (newDate) => {
        task.dueDate = parse(newDate, "yyyy-MM-dd", new Date());
      },
      "date"
    );
  });
  taskHeader.appendChild(taskTitle);
  taskHeader.append(
    Object.assign(document.createElement("h1"), {
      innerHTML: " - ",
      className: "taskHeaderElement",
    })
  );
  taskHeader.appendChild(taskDueDate);
  taskCard.appendChild(taskHeader);

  //P tag for task description
  let taskDescription = document.createElement("p");
  taskDescription.innerHTML = task.description;
  taskDescription.addEventListener("dblclick", () => {
    editElement(
      taskDescription,
      () => {
        taskDescription.innerHTML = task.description;
      },
      (newDescription) => {
        task.description = newDescription;
      }
    );
  });
  taskCard.appendChild(taskDescription);

  //Container for the notes list and header
  let notesListContainer = document.createElement("div");

  //Header for the notes section
  let notesHeader = document.createElement("h4");
  notesHeader.innerHTML = "Notes";

  //Button to add a new note
  let newNoteButton = document.createElement("img");
  newNoteButton.src = pencilSVG;
  newNoteButton.classList.add("pencilIcon");
  newNoteButton.addEventListener("click", (e) => {
    let newNoteBox = document.createElement("input");
    let taskNoteList = document.getElementById("taskNoteList");
    taskNoteList.insertBefore(newNoteBox, taskNoteList.firstChild);
    newNoteBox.focus();
    newNoteBox.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        task.addNote(newNoteBox.value);
        document.getElementById("taskNoteList").replaceWith(loadNotes(task));
      }
    });
  });
  notesHeader.appendChild(newNoteButton);

  notesListContainer.appendChild(notesHeader);

  //calls loadNotes and appends the result to the task list
  let taskNoteList = loadNotes(task);
  notesListContainer.appendChild(taskNoteList);

  taskCard.appendChild(notesListContainer);

  //Button to close the task card
  let closeButton = document.createElement("button");
  closeButton.classList.add("closeFormButton");
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", () => {
    closePopup();
  });

  taskCard.appendChild(closeButton);

  return taskCard;
}

/**
 *  Returns a ul with li elements for each note the task has
 * @param {Task} Task object containing notes
 * @returns Div containing li objects for each note
 */
function loadNotes(task) {
  //Pulls notes from task objects
  let notes = task.notes;

  //ul element containing all lists
  let taskNoteList = document.createElement("ul");
  taskNoteList.classList.add("taskNoteList");
  taskNoteList.id = "taskNoteList";

  //Iterating over notes list
  for (let note in notes) {
    let taskNoteDiv = document.createElement("li");
    let taskNote = document.createElement("div");
    taskNote.classList.add("taskNote");
    taskNote.innerHTML = notes[note];

    //Handles editing notes on double click
    taskNote.addEventListener("dblclick", () => {
      editElement(
        taskNote,
        () => {
          document.getElementById("taskNoteList").replaceWith(loadNotes(task));
        },
        (newNote) => {
          notes[note] = newNote;
        }
      );
    });

    //Delete button for each note
    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerHTML = "x";
    deleteTaskButton.addEventListener("click", (e) => {
      e.stopPropagation();
      task.removeNote(notes[note]);
      console.log(task.notes);
      document.getElementById("taskNoteList").replaceWith(loadNotes(task));
    });
    taskNoteDiv.appendChild(taskNote);
    taskNoteDiv.appendChild(deleteTaskButton);

    taskNoteList.appendChild(taskNoteDiv);
  }

  return taskNoteList;
}
