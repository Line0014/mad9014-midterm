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
  document
    .querySelector("#sortField")
    .addEventListener("change", changeSelection);
  document.querySelector(".cards").addEventListener("click", removeCard);
}

function buildCards(arr) {
  let html = arr
    .map((item) => {
      return `<div class="card" data-id="${item.id}">
        <h2 class="card__title">${item.name}</h2>
        <img class="card__image" src="${item.image}" alt="Portrait of ${item.name}" />
        <p class="card__info">Actor: ${item.actor}</p>
        <p class="card__info">First appearance: ${item.firstAppearance}</p>
        <p class="card__info">Born: ${item.born}</p>
        <p class="card__info card__info--highlight">Nationality: ${item.nationality}</p>
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
  for (let key in obj) {
    if (key !== "id" && key !== "image") {
      let option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.append(option);
    }
  }
}

function removeCard(ev) {
  let card = ev.target.closest(".card");
  if (!card) return;
  let id = card.getAttribute("data-id");
  displayData = displayData.filter((item) => item.id !== id);
  buildCards(displayData);
}

function changeSelection(ev) {
  let field = ev.target.value;
  if (field === "") return;
  document.querySelector("#currentSort").textContent =
    `Ready to sort by ${field}`;
  sortBy(ev);
}

function sortBy(ev) {
  ev.preventDefault();
  let field = document.querySelector("#sortField").value;
  if (field === "") return;
  displayData = displayData.toSorted((a, b) =>
    String(a[field]).localeCompare(String(b[field]), "en", { numeric: true }),
  );
  buildCards(displayData);
  document.querySelector("#currentSort").textContent =
    `List of characters sorted by ${field}`;
}
