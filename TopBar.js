export function TopBar(project) {
    let topBar = document.createElement("div");
    topBar.id = "topBar";

    let topBarTitle = document.createElement("h1");
    topBarTitle.classList.add("topBarTitle");
    let name = project.name;
    topBarTitle.innerHTML = name;
    topBar.appendChild(topBarTitle);

    return topBar;
}
