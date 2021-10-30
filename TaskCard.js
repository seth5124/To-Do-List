export function TaskCard(task) {
  let taskDueDateFormatted = `${task.dueDate.getMonth()}/${task.dueDate.getDate() + 1}`;

  //Creates task card
  let taskCard = document.createElement("div");

  //h1 tag for task title and due date
  let taskHeader = document.createElement('div');
  let taskTitle = document.createElement("h1");
  taskTitle.classList.add('taskHeaderElement');
  taskTitle.innerHTML = `${task.name}`;
  let taskDueDate = document.createElement('h1');
  taskDueDate.classList.add('taskHeaderElement');
  taskDueDate.innerHTML = `${taskDueDateFormatted}`;
  taskHeader.appendChild(taskTitle);
  taskHeader.append(Object.assign(document.createElement('h1'),{innerHTML: ' - ', className: 'taskHeaderElement'}));
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

  let notesEditButton = document.createElement("img");
  notesEditButton.src = "./assets/pencil.svg";
  notesEditButton.classList.add("pencilIcon");
  notesEditButton.addEventListener("click", (e) => {
    let newNoteBox = document.createElement("input");
    let taskNoteList = document.getElementById("taskNoteList");
    taskNoteList.insertBefore(newNoteBox, taskNoteList.firstChild);
    newNoteBox.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        task.addNote(newNoteBox.value);
        taskNoteList.replaceWith(loadNotes(task));
      }
    });
  });
  notesHeader.appendChild(notesEditButton);


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

    let deleteTaskButton = document.createElement('button');
    deleteTaskButton.innerHTML = 'x';
    deleteTaskButton.addEventListener('click', ()=>{
      task.removeNote(note);
      console.log(task.notes);
      document.getElementById('taskNoteList').replaceWith(loadNotes(task));
    })
    taskNote.appendChild(deleteTaskButton);

    taskNoteList.appendChild(taskNote);
  }

  return taskNoteList;
}

function editNote(note){


}
