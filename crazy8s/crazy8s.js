'use strict';

class Game {
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
    }
}

const game = new Game();
game.buildInitialDeck();
game.shuffle();
game.deal(8, game.opponentHand);
game.deal(8, game.playerHand);
game.flipCard();

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