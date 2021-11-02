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
  taskTitle.addEventListener('dblclick',()=>{
    editElement(taskTitle);
  })
  taskTitle.innerHTML = `${task.name}`;
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

  
  let notesHeader = document.createElement("h4");
  notesHeader.innerHTML = "Notes";

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

  let taskNoteList = loadNotes(task);
  notesListContainer.appendChild(taskNoteList);

  taskCard.appendChild(notesListContainer);

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

function loadNotes(task) {
  let notes = task.notes;
  let taskNoteList = document.createElement("ul");
  taskNoteList.classList.add("taskNoteList");
  taskNoteList.id = "taskNoteList";
  for (let note in notes) {
    let taskNote = document.createElement("li");
    taskNote.classList.add("taskNote");
    taskNote.innerHTML = notes[note];
    taskNote.addEventListener("click", () => {
      console.log("Edit!");
      editElement(taskNote);
      document.getElementById("taskNoteList").replaceWith(loadNotes(task));

    });

    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerHTML = "x";
    deleteTaskButton.addEventListener("click", (e) => {
      e.stopPropagation();
      task.removeNote(notes[note]);
      console.log(task.notes);
      document.getElementById("taskNoteList").replaceWith(loadNotes(task));
    });
    taskNote.appendChild(deleteTaskButton);

    taskNote.addEventListener("click", editElement(taskNote));
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
      let newValue = editBox.value;
      originalNode.innerHTML = newValue;
      editBox.replaceWith(originalNode);

    }
  });
}
