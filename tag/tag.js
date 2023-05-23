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
const player = {
    dx: 3,
    dy: 3,
    x: 0,
    y: 0,
    colour: "rgb(0,0,0)"
}

const opponent = {
    dx: 1.5,
    dy: 1.5,
    x: 0,
    y: 0,
    colour: "rgb(255,0,0)"
}

// Controls
const playButton = document.querySelector('#play');
let keyState = '';

function drawBlock(x,y,colour) {
    ctx.beginPath();
    ctx.rect(x,y,blockSize,blockSize);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        keyState = 'right';
    }

    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        keyState = 'left';
    }

    if (e.key === 'Up' || e.key === 'ArrowUp') {
        keyState = 'up';
    }

    if (e.key === 'Down' || e.key === 'ArrowDown') {
        keyState = 'down';
    }

    e.preventDefault();
}

// Currently disabled
function keyUpHandler(e) {
    keyState = '';
}

function updatePlayerPosition() {
switch (keyState) {
        case 'right':
            if (player.x <= canvasWidth-blockSize) {
                player.x+=player.dx;
            } 
            break;
        case 'left':
            if (player.x >= 0) {
                player.x-=player.dx;
            }
            break;
        case 'up':
            if (player.y >= 0) {
                player.y-=player.dy;
            }
            break;
        case 'down':
            if (player.y <= canvasHeight-blockSize) {
                player.y+=player.dy;
            }
            break;
        default:
            break;
    }
}

function updateOpponentPosition() {
    // determine which direction to move
    // if x distance is more than y distance -> move x
        //
    // else move y

    let xDistance = player.x - opponent.x;
    let yDistance = player.y - opponent.y;

    if (Math.abs(xDistance) > blockSize) {
        if (xDistance > 0) {
            opponent.x += opponent.dx;
        } else {
            opponent.x -= opponent.dx
        }
    } else {
        if (yDistance > 0) {
            opponent.y += opponent.dy;
        } else {
            opponent.y -= opponent.dy;
        }
    }
}

function gameOver() {
    return Math.abs(player.x-opponent.x) < blockSize && Math.abs(player.y-opponent.y) < blockSize;
}

function update() {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    if (gameOver()) {
        console.log('game over');
        stop();
        return;
    }

    updatePlayerPosition();
    //updateOpponentPosition();

    drawBlock(player.x,player.y, player.colour);
    drawBlock(opponent.x,opponent.y,opponent.colour);
    // requestAnimationFrame(update);
    redraw = animation(update);
}

function spawn() {
    player.x = Math.random()*canvasWidth;
    player.y = Math.random()*canvasHeight;

    if (player.x+100 < canvasWidth-blockSize) {
        opponent.x = player.x + 100;
    } else {
        opponent.x = player.x - 100;
    }

    if (player.y+100 < canvasHeight-blockSize) {
        opponent.y = player.y + 100;
    } else {
        opponent.y = player.y - 100;
    }

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

    keyState = '';
    spawn();

    document.addEventListener("keydown", keyDownHandler);
    // document.addEventListener("keyup", keyUpHandler, false);
    update();
}
playButton.addEventListener('click', play);