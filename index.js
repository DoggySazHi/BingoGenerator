onInit();

let data = null;

function onInit() {
    document.addEventListener("DOMContentLoaded", (e) => {
        renderBoxes();
    });
}

function renderBoxes() {
    let container = document.getElementById("board");
    for (let i = 0; i < 25; ++i) {
        let item = document.createElement("div");
        container.appendChild(item);
    }
}