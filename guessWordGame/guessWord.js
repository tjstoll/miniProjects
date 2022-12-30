'use strict';

const word = 'PLATYPUS';
let word_progression = ['_', '_', '_', '_', '_', '_', '_', '_'];
let word_appearance;
let turns;
let current_key;

function buildWord() {
    word_appearance = word_progression.join('');
    document.querySelector("#results").innerHTML = word_appearance;
}

function updateWordProgession() {
    for (let l=0; l<=word.length; l++) {
        if (word[l] === current_key) {
            word_progression[l] = current_key;
        }
    }
}

function checkGuess() {
    if (word.includes(current_key)) {
        updateWordProgession();
        buildWord();
    }
    else {
        turns--;
    }
}

function drawTurns() {
    let turn_string = '';
    for (let i=0; i<turns; i++) {
        turn_string += '&#x1F58D';
    }
    document.querySelector("#turns").innerHTML = turn_string;
}

function loopManager() {
    checkGuess();

    if (turns === 0) {
        document.querySelector("#outcome_lose").style.display = "block";
    }
    else if (word_appearance.indexOf('_') < 0) {
        console.log("YOU WIN");
    }

    updateWordProgession();
    buildWord();
    drawTurns();
}

function handle(key) {
    current_key = key;
    document.querySelector("#"+current_key).disabled = true;

    loopManager();
}

function initialize() {
    turns = 5;
    buildWord();
    drawTurns();
}