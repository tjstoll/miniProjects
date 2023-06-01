'use strict';

class Operation {
    constructor() {
        this.drawDeck = [];
        this.playDeck = [];
        this.playerHand = [];
        this.opponentHand = [];
        this.cardsToPlay = [];
    }

    buildInitialDeck() {
        const cardValue = ['A','2','3','4','5','6','7','8','9','10','J','K','Q'];
        const cardSuit = ['♠', '♣', '♥', '♦'];
        const numberOfCards = cardValue.length*cardSuit.length;
        for (let c=0; c<numberOfCards; c++) {
            let card = cardSuit[Math.floor(c/13)%cardSuit.length] + cardValue[c%cardValue.length];
            this.drawDeck.push(card);
        }
    }

    flipCard(qty = 1) {
        this.playDeck.push(...this.drawDeck.splice(0,qty));
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

            newCardButton.id = card;
            newCardButton.classList.add('playerCard');
            // newCardButton.addEventListener('click', ()=> {
            //     newCardButton.innerHTML = "-";
            // });

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
        let topCardText = document.createTextNode(deck.slice(-1));
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

function playerTurn() {
    const playerCardButtons = document.querySelectorAll('.playerCard');
    for (let cardButton of playerCardButtons) {
        cardButton.addEventListener('click', () => {
            operation.cardsToPlay.push(cardButton.id);
            cardButton.style.backgroundColor = 'red';
        })
    }
}

// Testing

// Build Game Pieces:
const operation = new Operation();
operation.buildInitialDeck();
operation.shuffle();
operation.deal(8, operation.opponentHand);
operation.deal(8, operation.playerHand);
operation.flipCard();

// Build Initial UI
const ui = new UI();
ui.updatePlayerCards(operation.playerHand);
ui.updateOpponentCards(operation.opponentHand.length);
ui.updateplayDeck(operation.playDeck);
ui.updateDrawDeck(operation.drawDeck);

class Game {
    constructor() {
        this.playerTurn = true;
    }

    // Build game pieces

    play() {
        // check if play is legal
        // send error message if not
        // play cards if so
    }

    playerTurn() {
        // add listeners to cards
        // listener: click -> add card to cardstoplay; change button style
        // call play
    }

    opponentTurn() {
        
    }
}