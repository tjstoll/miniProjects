'use strict';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const canvas_height = canvas.clientHeight;
const canvas_width = canvas.clientWidth;

const blockSize = 20;
let or = 0;
let x;
let y;
let dx = 0;

let game_in_play;

function drawStraight(x, y, orientation) {
    let i;
    let j;
    if (orientation % 2 === 0) {
        i = 1;
        j = 4;
    } else {
        i = 4;
        j = 1;
    }
    ctx.beginPath();
    ctx.rect(x,y, i*blockSize, j*blockSize);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawL(x, y, orientation) {
    let i;
    let j;
    let h;
    let v;

    switch (orientation) {
        case 0:
            i = 1;
            j = 3;
            h = 1;
            v = 2;
            break;

        case 1:
            i = 3;
            j = 1;
            h = 2;
            v = -1;
            break;
        
        case 2:
            i = 1;
            j = 3;
            h = -1;
            v = 0;
            break;
            
        case 3:
            i = 3;
            j = 1;
            h = 0;
            v = 1;
    }

    ctx.beginPath();
    ctx.rect(x,y, i*blockSize, j*blockSize);
    ctx.rect(x+h*blockSize,y+v*blockSize, blockSize, blockSize);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawSquare(x, y) {
    ctx.beginPath();
    ctx.rect(x,y, 2*blockSize, 2*blockSize);
    ctx.fillStyle = "lime";
    ctx.fill();
    ctx.closePath();
}

function drawT(x, y, orientation) {
    let i;
    let j;
    let h;
    let v;

    switch (orientation) {
        case 0:
            i = 3;
            j = 1;
            h = 1;
            v = 1;
            break;
        case 1:
            i = 1;
            j = 3;
            h = 1;
            v = 1;
            break;
        case 2:
            i = 3;
            j = 1;
            h = 1;
            v = -1;
            break;
        case 3:
            i = 1;
            j = 3;
            h = -1;
            v = 1;
            break;
    }

    ctx.beginPath();
    ctx.rect(x,y, i*blockSize, j*blockSize);
    ctx.rect(x+h*blockSize,y+v*blockSize, blockSize, blockSize);
    ctx.fillStyle = "cyan";
    ctx.fill();
    ctx.closePath();
}

function drawSkew(x, y, orientation) {
    let i;
    let j;
    let h;
    let v;

    if (orientation % 2 === 0) {
        i = 2;
        j = 1;
        h = -1;
        v = 1;
    } else {
        i = 1;
        j = 2;
        h = 1;
        v = 1;
    }

    ctx.beginPath();
    ctx.rect(x,y, i*blockSize, j*blockSize);
    ctx.rect(x+h*blockSize,y+v*blockSize, i*blockSize, j*blockSize);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath()
}

// ----------------------------------------------------------------------------

function updateBlockPosition() {
    ctx.clearRect(0,0, canvas_width, canvas_height);
    drawL(x, y, or);
    y += blockSize;
    x += dx;
}

// ----------------------------------------------------------------------------

function keyUpHandler(e) {
    if (e.key === 'Space' || e.key === " ") {
        if (or < 3) {
            or++;
            updateBlockPosition();
        } else {
            or = 0;
            updateBlockPosition();
        }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        dx = 0;
        updateBlockPosition();
    }
    e.preventDefault();
}

function keyDownHandler(e) {
    if (e.key === "ArrowLeft" || e.key === "Left") {
        dx = -blockSize;
        updateBlockPosition();
    } else if (e.key === "ArrowRight" || e.key === "Right") {
        dx = blockSize;
        updateBlockPosition();
    }
    e.preventDefault();
}

document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

// ----------------------------------------------------------------------------

function gameLoop() {
    updateBlockPosition();
}

function start() {
    console.log("game in play");
    x = canvas_width/2;
    y = 0;
    or = 0;

    if (!game_in_play) {
        game_in_play = setInterval(gameLoop, 750);
    }
}

function stop() {
    clearInterval(game_in_play);
    game_in_play = null;
    console.log("game out of play");
}