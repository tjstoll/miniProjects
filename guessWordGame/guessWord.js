'use strict';

let word;
const words = [
        'PLATYPUS',
        'AARDVARK',
        'SUNRISE',
        'CANTELOPE',
        'BASKETBALL'
    ];

let word_progression;
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

function gameOver() {
    if (turns === 0) {
        document.querySelector("#turns").innerHTML = "YOU LOSE";
        document.querySelector("#results").style.color = "red";
        console.log("YOU LOSE");
        return true;
    }
    else if (word_appearance.indexOf('_') < 0) {
        document.querySelector("#turns").innerHTML = "YOU WIN";
        document.querySelector("#results").style.color = "green";
        console.log("YOU WIN");
        return true;
    }
    else {
        return false;
    }
}

function loopManager() {
    checkGuess();

    if (gameOver()) {
        document.querySelectorAll('.kybrdbtn').forEach((btn) => {btn.disabled=true});
        return 0;
    }
    
    updateWordProgession();
    buildWord();
    drawTurns();
}

function findWord() {
    let random_index = Math.floor(Math.random()*words.length);
    word = words[random_index];
    
    for (let i=0; i<word.length; i++) {
        word_progression.push('_')
    }
}

function handle(key) {
    current_key = key;
    document.querySelector("#"+current_key).disabled = true;

    loopManager();
}

function initialize() {
    turns = 5;
    word_progression = [];
    document.querySelectorAll('.kybrdbtn').forEach((btn) => {btn.disabled=false});
    document.querySelector("#results").style.color = "black";
    findWord();
    buildWord();
    drawTurns();
}