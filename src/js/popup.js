/**
 * Takes in a div to show as a popup
 * @param {HTMLDivElement} popup - Div to show as a popup
 */
export function showPopup(popup) {
    popup.id = "popup";

    let content = document.getElementById("content");
    let body = document.getElementsByTagName("BODY")[0];
    body.insertBefore(popup, content);

    content.classList.toggle("blur");

    if (popup.getElementsByTagName("input")[0]) {
        popup.getElementsByTagName("input")[0].focus();
    }
}
/**
 * Destroys element with ID of 'popup' and unblurs background
 */
export function closePopup() {
  
    document.getElementById("popup").remove();
    document.getElementById("content").classList.toggle("blur");
}
