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
let current_letter;

function buildWordArea() {
    word_appearance = word_progression.join('');
    document.querySelector("#word_area").innerHTML = word_appearance;
}

function updateWordProgession() {
    for (let l=0; l<=word.length; l++) {
        if (word[l] === current_letter) {
            word_progression[l] = current_letter;
        }
    }
}

function checkGuess() {
    if (word.includes(current_letter)) {
        updateWordProgession();
    }
    else {
        turns--;
    }
}

function drawStatus() {
    let turn_string = '';
    for (let i=0; i<turns; i++) {
        turn_string += '&#x1F58D';
    }
    document.querySelector("#status").innerHTML = turn_string;
}

function gameOver() {
    if (turns === 0) {
        document.querySelector("#status").innerHTML = "YOU LOSE";
        document.querySelector("#word_area").style.color = "red";
        document.querySelector("#word_area").innerHTML = word;
        return true;
    }
    else if (word_appearance.indexOf('_') < 0) {
        document.querySelector("#status").innerHTML = "YOU WIN";
        document.querySelector("#word_area").style.color = "green";
        return true;
    }
    else {
        return false;
    }
}

function loopManager() {
    checkGuess();
    buildWordArea();

    if (gameOver()) {
        document.querySelectorAll('.kybrdbtn').forEach((btn) => {btn.disabled=true});
        return 0;
    }
    
    drawStatus();
}

function findWord() {
    let random_index = Math.floor(Math.random()*words.length);
    word = words[random_index];
    
    for (let i=0; i<word.length; i++) {
        word_progression.push('_')
    }
}

async function fetchWord() {
    const url = 'https://api.api-ninjas.com/v1/randomword?type=noun'
    await fetch(url, {
        method: "GET",
        headers: {
            'X-Api-Key': 'YOUR API KEY HERE'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        word = data['word'].toUpperCase();
    })
    .catch(e => {
        console.log('Something went wrong...');
        console.log(e);
    })

    for (let i=0; i<word.length; i++) {
        word_progression.push('_')
    }
}

function handle(letter) {
    current_letter = letter;
    document.querySelector("#"+current_letter).disabled = true;

    loopManager();
}

async function initialize() {
    turns = 5;
    word_progression = [];
    document.querySelectorAll('.kybrdbtn').forEach((btn) => {btn.disabled=false});
    document.querySelector("#word_area").style.color = "black";
    //findWord();
    await fetchWord();
    buildWordArea();
    drawStatus();
}