"use strict";
// Module JS file; hope your browser supports ES6 >:[

const WIDTH = 5;
const HEIGHT = 5;

let dataPromise = null;
let data = null;

await onInit();

async function onInit() {
    dataPromise = fetchData();
    document.addEventListener("DOMContentLoaded", async (e) => {
        await renderBoxes();
    });
    console.log("Initialized main script!");
}

async function fetchData() {
    let response = await fetch("data.json");
    data = await response.json();
}

async function renderBoxes() {
    let container = document.querySelector(".board");
    container.innerHTML = "";
    container.style.gridTemplateColumns = "1fr ".repeat(WIDTH);

    for (let i = 0; i < WIDTH * HEIGHT; ++i) {
        let item = document.createElement("div");
        item.classList.add("box");

        let textBox = document.createElement("span");
        item.appendChild(textBox);

        container.appendChild(item);
    }

    await fillBoxes(container);
}

async function fillBoxes(container) {
    await dataPromise;
    let children = container.children;
    let free = Math.floor(HEIGHT / 2) * WIDTH + Math.floor(WIDTH / 2);
    let phrases = data.phrases;
    let usedPhrases = [];
    for (let i = 0; i < children.length; ++i) {
        let child = children[i].firstChild;
        if (i === free) {
            child.innerHTML = "FREE SPACE";
            continue;
        }

        let rngIndex;
        do {
            // Make sure we don't reuse the same phrase in the table.
            rngIndex = Math.floor(Math.random() * phrases.length);
        } while (usedPhrases.includes(rngIndex) && usedPhrases.length < phrases.length);

        // Save it.
        usedPhrases.push(rngIndex);
        child.innerHTML = phrases[rngIndex];
    }
}