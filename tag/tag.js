'use strict';

// Canvas
const canvas = document.getElementById('canvas');
const canvasHeight = 300;
const canvasWidth = 300;
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext('2d');

// Map Stuff
const originalLevel1 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,1,0,0,1,1,0,0,1,0,0,0,0],
    [0,0,1,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
let level1;
const mapColour = {
    background: 'rgb(0,9,26)',
    inactive: 'rgb(0, 36, 102)',
    active: 'rgb(0, 71, 204)'
}
let score;
const maxScore = 38;


// Animation controls
const animation = requestAnimationFrame;
const cancelanimation = cancelAnimationFrame;
let redraw;

// Game object properties
const blockSize = 20;

// Physics
const player = {
    dx: 2,
    dy: 2,
    x: 0,
    y: 0,
    colour: "rgb(255, 214, 153)"
}

const opponent = {
    dx: 1,
    dy: 1,
    x: 0,
    y: 0,
    colour: "rgb(255, 0, 102)"
}

// Controls
const playButton = document.querySelector('#play');
let keyState = '';
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');
const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');

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

// Deactivated currently
function updateMap() {
    let mapX = Math.floor((player.x+blockSize/2)/blockSize);
    let mapY = Math.floor((player.y+blockSize/2)/blockSize);
    if (level1[mapY][mapX] == 1) {
        level1[mapY][mapX] = 2;
        score++;
    }
}

function updatePlayerPosition() {
    switch (keyState) {
        case 'right':
            if (player.x + player.dx <= canvasWidth-blockSize) {
                player.x+=player.dx;
            } 
            break;
        case 'left':
            if (player.x - player.dx >= 0) {
                player.x-=player.dx;
            }
            break;
        case 'up':
            if (player.y - player.dy >= 0) {
                player.y-=player.dy;
            }
            break;
        case 'down':
            if (player.y + player.dy <= canvasHeight-blockSize) {
                player.y+=player.dy;
            }
            break;
        default:
            break;
    }
}

function updateOpponentPosition() {
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
    let youreIt = Math.abs(player.x-opponent.x) < blockSize && Math.abs(player.y-opponent.y) < blockSize;
    
    if (youreIt) {
        ctx.font = '24px monospace';
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvasWidth/2, canvasHeight/2);
    }
    
    return youreIt;
}

function drawMap() {
    for (let row=0; row<level1.length; row++) {
        for (let col=0; col<level1.length; col++) {
            switch (level1[row][col]) {
                case 0:
                    drawBlock(col*blockSize, row*blockSize, mapColour.background);
                    break;
                case 1:
                    drawBlock(col*blockSize, row*blockSize, mapColour.inactive);
                    break;
                case 2:
                    drawBlock(col*blockSize, row*blockSize, mapColour.active);
                    break;
                default:
                    break;
            }
        }
    }
}

function update() {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    updatePlayerPosition();
    updateOpponentPosition();
    updateMap();

    drawMap();
    drawBlock(player.x,player.y, player.colour);
    drawBlock(opponent.x,opponent.y,opponent.colour);

    if (gameOver()) {
        console.log('game over');
        stop();
        return;
    } else if (score == maxScore) {
        console.log('you win!');
        ctx.font = '24px monospace';
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.textAlign = "center";
        ctx.fillText("VICTORY!", canvasWidth/2, canvasHeight/2);
        stop();
        return;
    } else {
        redraw = animation(update);
    }
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

    // player.x = (canvasWidth-blockSize)/2;
    // player.y = canvasHeight/4;

    // opponent.x = (canvasWidth-blockSize)/2;
    // opponent.y = 3*canvasWidth/4 

}

function stop() {
    cancelanimation(redraw);
    playButton.innerHTML = 'play!';
    playButton.classList.remove('stop');
    playButton.classList.add('play');
    playButton.removeEventListener('click', stop);
    playButton.addEventListener('click', play);
}

function play() {
    playButton.classList.remove('play');
    playButton.classList.add('stop');
    playButton.removeEventListener('click', play);
    playButton.addEventListener('click', stop);
    playButton.innerHTML = 'stop...';

    keyState = '';
    score = 0;
    level1 = structuredClone(originalLevel1);
    
    spawn();

    document.addEventListener("keydown", keyDownHandler);
    leftButton.addEventListener('click', ()=>{keyState = 'left'});
    rightButton.addEventListener('click', ()=>{keyState = 'right'});
    upButton.addEventListener('click', ()=>{keyState = 'up'});
    downButton.addEventListener('click', ()=>{keyState = 'down'});
    // document.addEventListener("keyup", keyUpHandler, false);
    update();
}
playButton.addEventListener('click', play);



// document.addEventListener('keydown', (e)=>{
//     if (e.key === ' ' || e.key === 'Space') {
//         play();
//     }
// })