export function showPopup(popup) {
  popup.id = "popup";

  let content = document.getElementById("content");
  let body = document.getElementsByTagName("BODY")[0];
  body.insertBefore(popup, content);
  content.classList.toggle("blur");
}

export function closePopup() {
  document.getElementById("popup").remove();
  document.getElementById("content").classList.toggle("blur");
}
