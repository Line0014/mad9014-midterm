import { info } from "./data.js";

document.addEventListener("DOMContentLoaded", init);

let displayData = [];

function init() {
  displayData = [...info.results];
  displayFields(displayData[0]);
  buildCards(displayData);
  addListeners();
}

function addListeners() {
  document.querySelector("#sortForm").addEventListener("submit", sortBy);
  document.querySelector("#sortField").addEventListener("change", sortBy);
  document.querySelector(".cards").addEventListener("click", removeCard);
}

function buildCards(arr) {
  let html = arr
    .map((item) => {
      return `<div class="card" data-id="${item.id}">
        <h3 class="card__title">${item.name}</h3>
        <img class="card__image" src="${item.image}" alt="${item.name}" />
        <p class="card__info">${item.actor}</p>
        <p class="card__info">${item.firstAppearance}</p>
        <p class="card__info">${item.nationality}</p>
      </div>`;
    })
    .join("");
  document.querySelector(".cards").innerHTML = html;
}

function displayFields(obj) {
  let select = document.querySelector("#sortField");
  let blank = document.createElement("option");
  blank.value = "";
  blank.textContent = "Choose a field";
  select.append(blank);
  Object.keys(obj)
    .filter((key) => key !== "id" && key !== "image")
    .forEach((key) => {
      let option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.append(option);
    });
}

function removeCard(ev) {
  let title = ev.target.closest(".card__title");
  if (!title) return;
  let id = title.closest(".card").dataset.id;
  displayData = displayData.filter((item) => item.id !== id);
  buildCards(displayData);
}

function sortBy(ev) {
  ev.preventDefault();
  let field = document.querySelector("#sortField").value;
  if (field === "") return;
  displayData = displayData.toSorted((a, b) =>
    String(a[field]).localeCompare(String(b[field])),
  );
  buildCards(displayData);
  document.querySelector("#currentSort").textContent = `Sorted by ${field}`;
}
