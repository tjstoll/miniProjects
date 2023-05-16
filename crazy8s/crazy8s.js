'use strict';

class Operation {
    constructor() {
        this.drawDeck = [];
        this.playDeck = [];
        this.playerHand = [];
        this.opponentHand = [];
    }

    buildInitialDeck() {
        const cardValue = ['A','2','3','4','5','6','7','8','9','10','J','K','Q'];
        const cardSuit = ['♠', '♣', '♥', '♦'];
        const numberOfCards = cardValue.length*cardSuit.length;
        for (let c=0; c<numberOfCards; c++) {
            let card = cardValue[c%cardValue.length] + cardSuit[Math.floor(c/13)%cardSuit.length];
            this.drawDeck.push(card);
        }
    }

    flipCard(qty = 1) {
        this.playDeck = this.drawDeck.splice(0,qty);
    }

    shuffle() {
        let originalDeckLength = this.drawDeck.length;
        let shuffledDeckLength = 0;
        let shuffledDeck = [];
    
        while (shuffledDeckLength != originalDeckLength) {
            let updatedDeckLength = originalDeckLength - shuffledDeckLength;
            let randomIndex = Math.floor(Math.random()*updatedDeckLength);
            let newCard = this.drawDeck[randomIndex];
    
            shuffledDeck.push(newCard);
            this.drawDeck.splice(randomIndex, 1);
    
            shuffledDeckLength++;
        }
    
        this.drawDeck = shuffledDeck; 
    }

    turnOverDeck() {
        this.drawDeck = this.playDeck.splice(0, this.playDeck.length-1);
        this.shuffle();
    }

    deal(qty, hand) {
        let deckLength = this.drawDeck.length;
        if (deckLength>qty) {
            hand.push(...this.drawDeck.splice(0, qty));
        } else {
            hand.push(...this.drawDeck);
            this.drawDeck = [];
            this.turnOverDeck();
            this.deal(qty-deckLength, hand);
        }
    }

    play(cards, hand) {
        this.playDeck.push(...cards);
        for (let card of cards ) {
            hand.splice(hand.indexOf(card), 1);
        }
    }
}

class UI {
    constructor() {
        this.opponentCards = document.querySelector('#opponentCards');
        this.playDeck = document.querySelector("#playDeck");
        this.drawDeck = document.querySelector("#drawDeck");
        this.playerCards = document.querySelector("#playerCards");
    }

    updatePlayerCards(cards) {
        this.playerCards.innerHTML = "";
        for (let card of cards) {
            let newCardButton = document.createElement("button");

            let newCardsButtonText = document.createTextNode(card);
            newCardButton.appendChild(newCardsButtonText);
            this.playerCards.appendChild(newCardButton);
        }
    }

    updateOpponentCards(numberOfCards) {
        this.opponentCards.innerHTML = "";
        for (let c=0; c<numberOfCards; c++) {
            let newCardButton = document.createElement("button");
            let newCardsButtonText = document.createTextNode("🐒");
            newCardButton.appendChild(newCardsButtonText);
            this.opponentCards.appendChild(newCardButton);
        }
    }

    updateplayDeck(deck) {
        this.playDeck.innerHTML = "";
        let topCard = document.createElement('button');
        let topCardText = document.createTextNode(deck.pop());
        topCard.appendChild(topCardText);
        this.playDeck.appendChild(topCard);
    }

    updateDrawDeck(deck) {
        this.drawDeck.innerHTML = "";
        let topCard = document.createElement('button');
        let topCardText = document.createTextNode(`(${deck.length})`);
        topCard.appendChild(topCardText);
        this.drawDeck.appendChild(topCard);
    }
}

// Testing

const operation = new Operation();
operation.buildInitialDeck();
operation.shuffle();
operation.deal(8, operation.opponentHand);
operation.deal(8, operation.playerHand);
operation.flipCard();

const ui = new UI();
ui.updatePlayerCards(operation.playerHand);
ui.updateOpponentCards(operation.opponentHand.length);
ui.updateplayDeck(operation.playDeck);
ui.updateDrawDeck(operation.drawDeck);

// const oppsDiv = document.getElementsByTagName("#opponent");
// const oppsCards = d
// const playerDiv = document.getElementsByTagName("#player");

// // Initialize global objects
// let drawDeck = [];
// let playDeck = [];
// let playerHand = [];
// let opponentHand = [];

// // Build the initial deck
// const cardValue = ['A','2','3','4','5','6','7','8','9','10','J','K','Q'];
// const cardSuit = ['♠', '♣', '♥', '♦'];
// const numberOfCards = cardValue.length*cardSuit.length;
// for (let c=0; c<numberOfCards; c++) {
//     let card = cardValue[c%cardValue.length] + cardSuit[Math.floor(c/13)%cardSuit.length];
//     drawDeck.push(card);
// }

// // Operations
// function shuffle(originalDeck) {
//     let originalDeckLength = originalDeck.length;
//     let shuffledDeckLength = 0;
//     let shuffledDeck = [];

//     while (shuffledDeckLength != originalDeckLength) {
//         let updatedDeckLength = originalDeckLength - shuffledDeckLength;
//         let randomIndex = Math.floor(Math.random()*updatedDeckLength);
//         let newCard = originalDeck[randomIndex];

//         shuffledDeck.push(newCard);
//         originalDeck.splice(randomIndex, 1);

//         shuffledDeckLength++;
//     }

//     return shuffledDeck;
// }

// function turnOverDeck(oldPlayDeck) {
//     let newPlayDeck = [];
//     const topCard = oldPlayDeck.pop();

//     newPlayDeck.push(topCard);
//     const newDrawDeck = shuffle(oldPlayDeck);

//     return newDrawDeck;
// }

// function deal(drawDeck, hand, qty) {
//     let deckLength = drawDeck.length;
//     if (deckLength>qty) {
//         hand.push(...drawDeck.splice(0, qty));
//         return [drawDeck, hand];
//     } else {
//         hand.push(...drawDeck);
//         // newDeck = turnOverDeck(playDeck);
//         // return deal(newDeck, hand, qty-deckLength);
//     }
// }

// // Testing
// let shuffledDeck = shuffle(drawDeck);

// const table = document.createElement('ul');
// for (let i=0; i<numberOfCards; i++) {
//     const item = document.createElement('li');
//     const text = document.createTextNode(shuffledDeck[i]);
//     item.appendChild(text);
//     table.appendChild(item);
// }
// document.querySelector('body').appendChild(table);