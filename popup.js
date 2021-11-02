export function showPopup(popup) {
  popup.id = "popup"; //Currently only supports one popup at a time

  //Grabs content and bosy elements to append the popup before everything else
  let content = document.getElementById("content");
  let body = document.getElementsByTagName("BODY")[0];
  body.insertBefore(popup, content);

  //Blurs background
  content.classList.toggle("blur");

  //focuses first input element
  if(popup.getElementsByTagName('input')[0]){
    popup.getElementsByTagName('input')[0].focus();
  }
}

export function closePopup() {

  //Destroys popup element and unblurs the back ground
  //TODO: set all other elements as non-selectable
  document.getElementById("popup").remove();
  document.getElementById("content").classList.toggle("blur");
}
