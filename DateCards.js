import { NewTaskForm } from "./NewTaskForm.js";
import { removeTaskFromProject } from "./DB.js";
import { TaskCard } from "./TaskCard.js";
import { showPopup } from "./popup.js";
import { isToday, isTomorrow } from "./DateUtilities.js";

export function DateCards(project) {
  let dateEntries = project.tasksByDate();
  let dateCards = document.createElement("div");
  dateCards.id = "DateCards";

  /**
   * Iterating over each date containing each date's tasks
   */
  for (let date in dateEntries) {
    date = new Date(date); //Converts to date object for easy reference

    //Creates Task Card element
    let dateCard = document.createElement("div");
    dateCard.classList.add("dateCard");

    //Creates title of task card
    let dateCardTitle = document.createElement("div");
    dateCardTitle.classList.add("dateCardTitle");
    dateCard.appendChild(dateCardTitle);

    //datecardContent is a div element for holding the task card list and separating it from the title
    let dateCardContent = document.createElement("div");
    dateCardContent.classList.add("dateCardContent");
    dateCard.appendChild(dateCardContent);

    //Creates ul element for tasks to be appended to
    let dateCardList = document.createElement("ul");
    dateCardList.classList.add("dateCardList");

    //Replaces the task card's title with "Today" or "Tomorrow" if appropriate
    //Otherwise the card is titled with its date (MM/DD)
    if (isToday(date)) {
      dateCardTitle.innerHTML = "Today";
    } else if (isTomorrow(date)) {
      dateCardTitle.innerHTML = "Tomorrow";
    } else {
      dateCardTitle.innerHTML = `${date.getMonth() + 1}/${date.getDate() + 1}`;
    }

    /**
     * Iterating over each task in the current date
     * to create an entry inside the date card
     */
    for (let task in dateEntries[date]) {
      let currentTask = dateEntries[date][task];

      //Creates li element for the task entry
      let dateCardEntry = document.createElement("li");
      dateCardEntry.classList.add("dateCardEntry");

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      
      deleteButton.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log(e);

        removeTaskFromProject(project, currentTask);
        document.dispatchEvent(
          new CustomEvent("tasksUpdated", { detail: project })
        );
      });

      dateCardEntry.appendChild(deleteButton);

      //Creates h3 element for task name
      let name = currentTask.name;
      let nameLabel = document.createElement("h3");
      nameLabel.innerHTML = name;

      //Creates img element for the "is done "checkbox
      let checkBox = createCheckMark();
      checkBox.classList.add("check");
      let checkImgSrc = "./assets/check.svg";
      checkBox.src = checkImgSrc;

      //Appends task name to the li
      dateCardEntry.appendChild(nameLabel);

      //Appends the checkbox to the li
      dateCardEntry.appendChild(checkBox);

      //Appends the task to the task list
      dateCardList.appendChild(dateCardEntry);

      dateCardEntry.addEventListener("click", () => {
        showPopup(TaskCard(currentTask));
      });
    }
    dateCardContent.appendChild(dateCardList); //Appends task list to the dateCardContent div
    dateCards.appendChild(dateCard); //Appends the entire card to the date card list
  }

  /**creates blank task card with new task button */
  function BlankdateCard(project) {
    //Creates Task Card element
    let blankdateCard = document.createElement("div");
    blankdateCard.classList.add("dateCard");
    blankdateCard.classList.add("blank");

    let plusIcon = document.createElement("img");
    plusIcon.src = "./assets/plus.svg";
    blankdateCard.appendChild(plusIcon);
    plusIcon.classList.add("plusIcon");
    plusIcon.addEventListener("click", function (e) {
      e.preventDefault();
      showPopup(NewTaskForm(project));
    });

    return blankdateCard;
  }

  dateCards.appendChild(BlankdateCard(project));

  return dateCards;
}


/**Generates an inline SVG version of the check.svg file in the assets folder
 * This is so CSS can style the element
 * @returns SVG element
 */
function createCheckMark() {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M22 11.08V12a10 10 0 1 1-5.93-9.14");

  let polyline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline"
  );
  polyline.setAttribute("points", "22 4 12 14.01 9 11.01");
  svg.appendChild(polyline);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("class", "feather feather-check-circle");
  svg.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  svg.appendChild(path);
  svg.classList.add("check");
  return svg;
}

function createPlusIcon() {}
