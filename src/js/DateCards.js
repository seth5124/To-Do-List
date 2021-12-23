import { NewTaskForm } from "./NewTaskForm.js";
import { removeTaskFromProject } from "./DB.js";
import { TaskCard } from "./TaskCard.js";
import { showPopup } from "./popup.js";
import { format, isToday, isTomorrow, isThisYear} from "date-fns";
import { Project } from "./project.js";
import plusSVG from "../assets/plus.svg";

/**
 * Generates cards containing all  of a project's tasks separated by date.
 * Also appends a blank date card at the endused for creating new tasks
 * @param {Project} project - Project to pull tasks from and display as date cards
 * @returns {HTMLDivElement} HTMLDivElement - Div of ID "DateCards"
 */
export function DateCards(project) {
    let dateEntries = project.getTasksSorted();
    let dateCards = document.createElement("div");
    dateCards.id = "DateCards";

    for (let date in dateEntries) {
        date = new Date(date);

        let dateCard = document.createElement("div");
        dateCard.classList.add("dateCard");

        let dateCardTitle = document.createElement("div");
        dateCardTitle.classList.add("dateCardTitle");
        dateCard.appendChild(dateCardTitle);

        let dateCardContent = document.createElement("div");
        dateCardContent.classList.add("dateCardContent");
        dateCard.appendChild(dateCardContent);

        let dateCardList = document.createElement("ul");
        dateCardList.classList.add("dateCardList");

        //Replaces the task card's title with "Today" or "Tomorrow" if appropriate
        //Otherwise the card is titled with its date (M/d)
        if (isToday(date)) {
            dateCardTitle.innerHTML = "Today";
        } else if (isTomorrow(date)) {
            dateCardTitle.innerHTML = "Tomorrow";
        }else if(!isThisYear(date)){
            dateCardTitle.innerHTML = format(date, "M/d/yy");
        } else {
            dateCardTitle.innerHTML = format(date, "M/d");
        }

        for (let task in dateEntries[date]) {
            let currentTask = dateEntries[date][task];

            let dateCardEntry = document.createElement("li");
            dateCardEntry.classList.add("dateCardEntry");

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "X";

            deleteButton.addEventListener("click", function (e) {
                e.stopPropagation();
                removeTaskFromProject(project, currentTask);
                document.dispatchEvent(
                    new CustomEvent("tasksUpdated", { detail: project })
                );
                document.dispatchEvent(
                    new CustomEvent("tagsUpdated")
                );
            });

            dateCardEntry.appendChild(deleteButton);

            let name = currentTask.name;
            let nameLabel = document.createElement("h3");
            nameLabel.innerHTML = name;

            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.classList.add("taskCheckBox");

            if (currentTask.isDone) {
                nameLabel.classList.toggle("checkedOff");
                checkBox.setAttribute("checked", "checked");
            }

            checkBox.classList.add("check");
            let checkImgSrc = "../assets/check.svg";
            checkBox.src = checkImgSrc;
            checkBox.addEventListener("click", (event) => {
                event.stopPropagation();
                currentTask.toggleDone();
                nameLabel.classList.toggle("checkedOff");
            });

            dateCardEntry.appendChild(nameLabel);
            dateCardEntry.appendChild(checkBox);
            dateCardList.appendChild(dateCardEntry);

            dateCardEntry.addEventListener("click", () => {
                showPopup(TaskCard(currentTask));
            });
        }

        let newTaskButton = document.createElement("img");
        newTaskButton.src = plusSVG;
        newTaskButton.classList.add("newTaskButton");
        newTaskButton.addEventListener("click", () => {
            showPopup(NewTaskForm(project, date));
        });
        dateCardList.appendChild(newTaskButton);

        dateCardContent.appendChild(dateCardList);
        dateCards.appendChild(dateCard);
    }

    /**
     * Renders a blank date card with a plus symbol on it that allows creation of new tasks
     * @param {Project} project - Project the card would add its new tasks to
     * @returns {HTMLDivElement} Div containing the blank card
     */
    function BlankDateCard(project) {
        let blankDateCard = document.createElement("div");
        blankDateCard.classList.add("dateCard");
        blankDateCard.classList.add("blank");

        //imports plus icon from SVG asset
        let plusIcon = document.createElement("img");
        plusIcon.src = plusSVG;
        plusIcon.classList.add("plusIcon");
        plusIcon.setAttribute("draggable", false);
        plusIcon.addEventListener("click", function (e) {
            e.preventDefault();
            showPopup(NewTaskForm(project));
        });
        blankDateCard.appendChild(plusIcon);

        return blankDateCard;
    }

    dateCards.appendChild(BlankDateCard(project));

    return dateCards;
}
