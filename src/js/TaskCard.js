import { closePopup } from "./popup.js";
import { format, parse } from "date-fns";
import { editElement } from "./EditElement.js";
import pencilSVG from "../assets/pencil.svg";

/**
 * Renders a task card for the given task
 * @param {Task} Task
 * @returns {HTMLDivElement} Div Element for task card
 */
export function TaskCard(task) {
    let taskCard = document.createElement("div");

    let taskHeader = document.createElement("div");

    let tagContainer = document.createElement("div");
    tagContainer.classList.add("taskTagContainer");

    function createNewTagButton() {
        let newTagButton = document.createElement("div");
        newTagButton.classList.add("taskTag");
        let tagTitle = document.createElement("p");
        tagTitle.innerHTML = "Add Tag +";
        newTagButton.appendChild(tagTitle);

        newTagButton.addEventListener("click", () => {
            let newTag = document.createElement("div");
            let editField = document.createElement("input");
            editField.classList.add("tagEditbox");
            newTag.appendChild(editField);
            editField.addEventListener("keyup", (e) => {
                if (e.key == "Enter") {
                    let newTagValue = editField.value;
                    if(!isValidTag(newTagValue,task)) return;
                    task.addTag(newTagValue);
                    document.dispatchEvent(
                        new CustomEvent("tagsUpdated", {
                            detail: {
                                task: task,
                            },
                        })
                    );
                    newTag.replaceWith(newTagButton);
                }
            });
            newTagButton.replaceWith(newTag);
            editField.focus();
        });

        return newTagButton;
    }

    function createTagDiv(tag) {
        let tagDiv = document.createElement("div");
        tagDiv.classList.add("taskTag");
        let tagTitle = document.createElement("p");
        tagTitle.innerHTML = tag;
        let deleteButton = document.createElement("p");
        deleteButton.innerHTML = "x";
        function deleteTag() {
            task.removeTag(tag);
        }
        deleteButton.addEventListener("click", deleteTag);

        tagDiv.appendChild(tagTitle);
        tagDiv.appendChild(deleteButton);

        return tagDiv;
    }

    for (let tag in task.tags) {
        tagContainer.appendChild(createTagDiv(task.tags[tag]));
    }
    let newTagButton = createNewTagButton();

    tagContainer.appendChild(newTagButton);
    let taskTitle = document.createElement("h1");
    taskTitle.classList.add("taskHeaderElement");
    taskTitle.classList.add("editable");
    task.isDone ? taskTitle.classList.toggle("checkedOff") : {};
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

    let taskDueDate = document.createElement("h1");
    taskDueDate.classList.add("taskHeaderElement");
    taskDueDate.classList.add("editable");
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

    let taskDescription = document.createElement("p");
    taskDescription.classList.add("editable");
    taskDescription.innerHTML = task.description
        ? task.description
        : "Add a description";
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

    let taskPriority = document.createElement("h3");
    taskPriority.classList.add("editable");
    taskPriority.classList.add("taskHeaderElement");

    taskPriority.innerHTML = `Priority: ${task.priorityName}`;
    taskPriority.addEventListener("dblclick", () => {
        editElement(
            taskPriority,
            () => {
                taskPriority.innerHTML = `Priority: ${task.priorityName}`;
                document.dispatchEvent(new CustomEvent("tasksUpdated"));
            },
            (newPriority) => {
                task.priority = newPriority;
            },
            "select",
            [{name: 'Emergency', value: 0},{name:"Urgent",value: 1},{name:'Routine',value:2}]
        );
    });

    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(
        Object.assign(document.createElement("h1"), {
            innerHTML: " - ",
            className: "taskHeaderElement",
        })
    );
    taskHeader.appendChild(taskDueDate);
    taskHeader.appendChild(
        Object.assign(document.createElement("h1"), {
            innerHTML: " - ",
            className: "taskHeaderElement",
        })
    );
    taskHeader.appendChild(taskPriority);

    taskHeader.appendChild(tagContainer);

    taskCard.appendChild(taskHeader);
    taskCard.appendChild(taskDescription);

    let notesListContainer = document.createElement("div");

    let notesHeader = document.createElement("h4");
    notesHeader.innerHTML = "Notes";

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
                document
                    .getElementById("taskNoteList")
                    .replaceWith(loadNotes(task));
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
        closePopup();
    });

    taskCard.appendChild(closeButton);

    return taskCard;
}

/**
 *  Renders the note list
 * @param {Task} Task - object containing notes
 * @returns {HTMLUListElement} HTMLUListElement - Note List
 */
function loadNotes(task) {
    let notes = task.notes;

    let taskNoteList = document.createElement("ul");
    taskNoteList.classList.add("taskNoteList");
    taskNoteList.id = "taskNoteList";

    for (let note in notes) {
        let taskNoteDiv = document.createElement("li");
        let taskNote = document.createElement("div");
        taskNote.classList.add("taskNote");
        taskNote.classList.add("editable");
        taskNote.innerHTML = notes[note];

        taskNote.addEventListener("dblclick", () => {
            editElement(
                taskNote,
                () => {
                    document
                        .getElementById("taskNoteList")
                        .replaceWith(loadNotes(task));
                },
                (newNote) => {
                    notes[note] = newNote;
                }
            );
        });

        let deleteTaskButton = document.createElement("button");
        deleteTaskButton.innerHTML = "x";
        deleteTaskButton.addEventListener("click", (e) => {
            e.stopPropagation();
            task.removeNote(notes[note]);
            document
                .getElementById("taskNoteList")
                .replaceWith(loadNotes(task));
        });

        taskNoteDiv.appendChild(taskNote);
        taskNoteDiv.appendChild(deleteTaskButton);
        taskNoteList.appendChild(taskNoteDiv);
    }

    return taskNoteList;
}


function isValidTag(tag,attachedTask){

        let TAG_MAX_LENGTH = 15;
        let TAG_MIN_LENGTH = 1;

        if (
            tag.length < TAG_MIN_LENGTH ||
            tag.length > TAG_MAX_LENGTH
        ) {
            return false;
        }

        if (attachedTask.tags.includes(tag)) {
            return false;
        }

        return true;


}