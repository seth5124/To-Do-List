/**
 * Creates a task card for the given task
 * @param {Task} Tas 
 * @returns Div containing a task card popup containing the task details
 */
export function TaskCard(task) {
  let taskDueDateFormatted = `${task.dueDate.getMonth()}/${
    task.dueDate.getDate() + 1
  }`;

  //Creates task card
  let taskCard = document.createElement("div");

  //h1 tag for task title and due date
  let taskHeader = document.createElement("div");
  let taskTitle = document.createElement("h1");
  taskTitle.classList.add("taskHeaderElement");

  //Not implemented fully
  //Will allow editing of the task title
  taskTitle.addEventListener('dblclick',()=>{
    editElement(taskTitle);
  })
  taskTitle.innerHTML = `${task.name}`;

  /**
   * Task title and due date are seperate elements
   * so they can be clicked and edited individually
   */
  let taskDueDate = document.createElement("h1");
  taskDueDate.classList.add("taskHeaderElement");
  taskDueDate.innerHTML = `${taskDueDateFormatted}`;
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
  taskCard.appendChild(taskDescription);

  //Container for the notes list and header
  let notesListContainer = document.createElement("div");

  //Header for the notes section
  let notesHeader = document.createElement("h4");
  notesHeader.innerHTML = "Notes";

  //Button to add a new note
  let newNoteButton = document.createElement("img");
  newNoteButton.src = "./assets/pencil.svg";
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
    document.getElementById("popup").remove();
    document.getElementById("content").classList.toggle("blur");
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
    let taskNote = document.createElement("li");
    taskNote.classList.add("taskNote");
    taskNote.innerHTML = notes[note];
    
    //Handles editing notes on double click
    taskNote.addEventListener("click",() => {
      console.log("Edit!");
      let originalNode = taskNote;
      let editBox = document.createElement("input");
      taskNote.replaceWith(editBox);
      editBox.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
          let newValue = editBox.value;
          originalNode.innerHTML = newValue;
          notes[note] = newValue;
          editBox.replaceWith(originalNode);
      document.getElementById("taskNoteList").replaceWith(loadNotes(task));
    
        }
      });

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
    taskNote.appendChild(deleteTaskButton);

    taskNoteList.appendChild(taskNote);
  }

  return taskNoteList;
}

//take in a node
//replace it with an input box
//enter box "on enter" => replace the input box with the original node with the new value
//working almost but need to figure out how to get it replacing properly
function editElement(node) {
  let originalNode = node;
  let editBox = document.createElement("input");
  node.replaceWith(editBox);
  editBox.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      newValue = editBox.value;
      originalNode.innerHTML = newValue;
      editBox.replaceWith(originalNode);

    }
  });
}
