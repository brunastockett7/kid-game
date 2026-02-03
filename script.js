const animals = ["🐶","🐱","🐭","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷"];

let deck = [];
let first = null;
let second = null;
let locked = false;
let matches = 0;

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const restart = document.getElementById("restart");

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

function reset() {
  deck = shuffle([...animals, ...animals]);
  first = null;
  second = null;
  locked = false;
  matches = 0;
  message.textContent = "";
  grid.innerHTML = "";

  deck.forEach((animal) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = "❓";

    card.addEventListener("click", () => flip(card, animal));
    grid.appendChild(card);
  });
}

function flip(card, animal) {
  if (locked) return;
  if (card.classList.contains("matched")) return;
  if (card === first) return;

  card.textContent = animal;

  if (!first) {
    first = card;
    return;
  }

  second = card;
  locked = true;

  if (first.textContent === second.textContent) {
    first.classList.add("matched");
    second.classList.add("matched");
    matches += 1;

    first = null;
    second = null;
    locked = false;

    if (matches === animals.length) {
      message.textContent = "🎉 You matched all the animals!";
    }
    return;
  }

  setTimeout(() => {
    first.textContent = "❓";
    second.textContent = "❓";
    first = null;
    second = null;
    locked = false;
  }, 650);
}

restart.addEventListener("click", reset);

reset();
