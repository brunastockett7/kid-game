const animals = [
  "🐶","🐱","🐭","🐰",
  "🦊","🐻","🐼","🐨",
  "🐯","🦁","🐮","🐷"
];

let cards = [...animals, ...animals];
let firstCard = null;
let secondCard = null;
let locked = false;
let matches = 0;

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const restart = document.getElementById("restart");

function shuffle() {
  cards.sort(() => Math.random() - 0.5);
}

function startGame() {
  grid.innerHTML = "";
  shuffle();
  matches = 0;
  message.textContent = "";
  firstCard = null;
  secondCard = null;
  locked = false;

  cards.forEach(animal => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = "❓";
    card.onclick = () => flip(card, animal);
    grid.appendChild(card);
  });
}

function flip(card, animal) {
  if (locked) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;

  card.textContent = animal;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  locked = true;

  if (firstCard.textContent === secondCard.textContent) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    resetTurn();

    if (matches === animals.length) {
      message.textContent = "🎉 You matched all the animals!";
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = "❓";
      secondCard.textContent = "❓";
      resetTurn();
    }, 700);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  locked = false;
}

restart.onclick = startGame;

startGame();
