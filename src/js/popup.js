

/**
 * Takes in a div to show as a popup
 * @param {HTMLDivElement} popup - Div to show as a popup
 */
export function showPopup(popup) {
    popup.id = "popup";

    let content = document.getElementById("content");
    let body = document.getElementsByTagName("BODY")[0];
    body.insertBefore(popup, content);

    content.classList.add("blur");

    if (popup.getElementsByTagName("input")[0]) {
        popup.getElementsByTagName("input")[0].focus();
    }

    setTimeout(()=>{
        content.addEventListener('click',clickAway);
    });
}
/**
 * Destroys element with ID of 'popup' and unblurs background
 */
export function closePopup() {

    let content = document.getElementById("content");
    content.removeEventListener('click',clickAway);
    document.getElementById("popup").remove();
    document.getElementById("content").classList.remove("blur");
    
}

function clickAway(){
    closePopup();
}