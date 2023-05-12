'use strict';

// Build the deck
let drawDeck = [];
const cardValue = ['A','2','3','4','5','6','7','8','9','10','J','K','Q'];
const cardSuit = ['♠', '♣', '♥', '♦'];
const numberOfCards = cardValue.length*cardSuit.length;
for (let c=0; c<numberOfCards; c++) {
    let card = cardValue[c%cardValue.length] + cardSuit[Math.floor(c/13)%cardSuit.length];
    drawDeck.push(card);
}

function shuffle(originalDeck) {
    let originalDeckLength = originalDeck.length;
    let shuffledDeckLength = 0;
    let shuffledDeck = [];

    while (shuffledDeckLength != originalDeckLength) {
        let updatedDeckLength = originalDeckLength - shuffledDeckLength;
        let randomIndex = Math.floor(Math.random()*updatedDeckLength);
        let newCard = originalDeck[randomIndex];

        shuffledDeck.push(newCard);
        originalDeck.splice(randomIndex, 1);

        shuffledDeckLength++;
    }

    return shuffledDeck;
}

let shuffledDeck = shuffle(drawDeck);

const table = document.createElement('ul');
for (let i=0; i<numberOfCards; i++) {
    const item = document.createElement('li');
    const text = document.createTextNode(shuffledDeck[i]);
    item.appendChild(text);
    table.appendChild(item);
}
document.querySelector('body').appendChild(table);