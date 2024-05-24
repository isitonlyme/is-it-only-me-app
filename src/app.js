"use strict";

import dateData from "../data/date.json";
import partyData from "../data/party.json";
import spicyData from "../data/spicy.json";

let data = [];

const categoryMap = {
  date: dateData,
  party: partyData,
  spicy: spicyData,
};

function chooseCategory(category) {
  if (category === "mixed") {
    //add everything from the json files into the empty data array
    data = [...dateData, ...partyData, ...spicyData];
    renderedCards = [];
    renderCards();
  } else {
    const categoryData = categoryMap[category];
    if (categoryData) {
      data = [...categoryData];
      renderedCards = [];
      renderCards();
    } else {
      console.error("Category not found:", category);
    }
  }
}

let renderedCards = [];
const cardStack = document.getElementById("cardStack");
document.getElementById("removeButton").addEventListener("click", removeCard);
document.getElementById("addButton").addEventListener("click", addNewCard);

document
  .getElementById("addSpicy")
  .addEventListener("click", () => chooseCategory("spicy"));
document
  .getElementById("addParty")
  .addEventListener("click", () => chooseCategory("party"));
document
  .getElementById("addDate")
  .addEventListener("click", () => chooseCategory("date"));
document
  .getElementById("addMixed")
  .addEventListener("click", () => chooseCategory("mixed"));

// ------------------------------------------------------------
// Creating a card in HTML and adds the question and category as text
// ------------------------------------------------------------
function createCardElement(index) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.innerText = `Is it only me ${data[index].question} from ${data[index].category}`;
  return cardElement;
}

// ------------------------------------------------------------
// Renders 5 cards when you load in to the page
// ------------------------------------------------------------
function renderCards() {
  cardStack.textContent = "";
  //pick 5 random numbers and renders the card with these indexes
  for (let i = 0; i < 5; i++) {
    addNewCard();
  }
}

// ------------------------------------------------------------
// Remove the first card in the card stack div
// ------------------------------------------------------------
function removeCard() {
  if (cardStack.childElementCount > 0) {
    cardStack.removeChild(cardStack.firstChild);
  }
}

// ------------------------------------------------------------
// Add a new card to the stack at the back of the pile
// ------------------------------------------------------------
function addNewCard() {
  //pick a random number to take a random question from json
  const randomIndex = Math.floor(Math.random() * data.length);
  //check if this specific question has already been added by checking it against renderedCards array
  if (renderedCards.includes(randomIndex)) {
    // start over
    if (renderedCards.length === data.length) {
      const lastCard = document.createElement("div");
      lastCard.className = "card";
      lastCard.textContent = "Oh no! no cards :(";
      cardStack.appendChild(lastCard);
      return;
    }
    addNewCard();
  } else {
    // add card
    const cardElement = createCardElement(randomIndex);
    cardStack.appendChild(cardElement);
    renderedCards.push(randomIndex);
  }
}

function init() {}

window.addEventListener("load", init);
