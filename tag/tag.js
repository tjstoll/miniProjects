'use strict';

// Canvas
const canvas = document.getElementById('canvas');
const canvasHeight = 400;
const canvasWidth = 400;
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext('2d');

// Animation controls
const animation = requestAnimationFrame;
const cancelanimation = cancelAnimationFrame;
let redraw;

// Game object properties
const blockSize = 15;

// Physics
let dx = 3;
let dy = 3;
let x;
let y;

// Controls
const playButton = document.querySelector('#play');
let keyState = ''
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

function drawBlock(x,y) {
    ctx.beginPath();
    ctx.rect(x,y,blockSize,blockSize);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        keyState = 'right';
        leftPressed = false;
        rightPressed = true;
        upPressed = false;
        downPressed = false;
    }

    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        keyState = 'left'
        leftPressed = true;
        rightPressed = false;
        upPressed = false;
        downPressed = false;
    }

    if (e.key === 'Up' || e.key === 'ArrowUp') {
        keyState = 'up';
        leftPressed = false;
        rightPressed = false;
        upPressed = true;
        downPressed = false;
    }

    if (e.key === 'Down' || e.key === 'ArrowDown') {
        keyState = 'down'
        leftPressed = false;
        rightPressed = false;
        upPressed = false;
        downPressed = true;
    }

    console.log(keyState);
    e.preventDefault();
}

function keyUpHandler(e) {
    keyState = '';
    leftPressed = false;
    rightPressed = false;
    upPressed = false;
    downPressed = false;
    console.log(keyState);
}

function update() {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    switch (keyState) {
        case 'right':
            x+=dx;
            break;
        case 'left':
            x-=dx;
            break;
        case 'up':
            y-=dy
            break;
        case 'down':
            y+=dy;
            break;
    }

    drawBlock(x,y);
    // requestAnimationFrame(update);
    redraw = animation(update);
}

function stop() {
    cancelanimation(redraw);
    playButton.innerHTML = 'play!';
    playButton.removeEventListener('click', stop);
    playButton.addEventListener('click', play);
}

function play() {
    playButton.removeEventListener('click', play);
    playButton.addEventListener('click', stop);
    playButton.innerHTML = 'stop';
    x = (canvasWidth - blockSize)/2
    y = (canvasWidth - blockSize)/2
    drawBlock(x,y);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    update();
}
playButton.addEventListener('click', play);