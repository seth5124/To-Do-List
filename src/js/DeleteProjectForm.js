import { deleteProject, getHomeProject } from "./DB";
import { closePopup } from "./popup.js";
import { Project } from "./project.js";

/**
 * Displays prompt that gives the option to delete a given project
 * @param {Project} project - Project to delete
 * @returns {HTMLDivElement} Form to display
 */
export function DeleteProjectForm(project) {
  let deleteFormPrompt = document.createElement("div");
  let deleteFormHeader = document.createElement("h1");
  deleteFormHeader.innerHTML = `Delete ${project.name}?`;
  deleteFormPrompt.appendChild(deleteFormHeader);

  let yesButton = document.createElement("button");
  yesButton.innerHTML = "Yes";
  yesButton.addEventListener("click", () => {
    deleteProject(project);
    document.dispatchEvent(
      new CustomEvent("projectChanged", { detail: getHomeProject() })
    );
    closePopup();
  });
  deleteFormPrompt.appendChild(yesButton);

  let noButton = document.createElement("button");
  noButton.innerHTML = "No";
  noButton.addEventListener("click", () => {
    closePopup();
  });
  deleteFormPrompt.appendChild(noButton);

  return deleteFormPrompt;
}
