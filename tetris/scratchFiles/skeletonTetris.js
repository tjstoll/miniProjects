'use strict';

const clear_grid = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]
let new_grid;
let grid = structuredClone(clear_grid);
let grid_width = grid[0].length
let grid_height = grid.length

const blockSize = 20;
const blockType = [1,2,3,4,5];
let currentBlockType = blockType[Math.floor(Math.random()*5)];

const consoleGrid = document.querySelector("#console");
const ctx = consoleGrid.getContext("2d");
consoleGrid.height = grid_height*blockSize;
consoleGrid.width = grid_width*blockSize;

const skeletonGrid = document.querySelector('#skeletonConsole');

let advanceInterval;
let drawInterval;
let x=Math.floor(grid_width/2);
let y=0;

function positionBlock() {
    new_grid[y][x] = currentBlockType;
}

function drawBlock(row, col, colour) {
    ctx.beginPath();
    ctx.rect(col*blockSize, row*blockSize,blockSize,blockSize);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
}

function drawGrid() {
    ctx.clearRect(0,0,grid_width*blockSize,grid_height*blockSize);
    
    for (let row=0; row<grid_height; row++) {
        for (let col=0; col<grid_width; col++) {
            
            switch (new_grid[row][col]) {
                case 1:
                    drawBlock(row, col, "cyan");
                    break;
                case 2:
                    drawBlock(row, col, "red");
                    break;
                case 3:
                    drawBlock(row, col, "yellow");
                    break;
                case 4:
                    drawBlock(row, col, "lime");
                    break;
                case 5:
                    drawBlock(row, col, "purple");
                    break;
            }
        }
    }
}

function drawSkeleton() {
    let test_string = '';
    for (let row=0; row<grid_height; row++) {
        test_string += new_grid[row].join('') + '<br>';
    }
    skeletonGrid.innerHTML = test_string;
}

function keyDownHandler(e) {
    if (e.key === 'ArrowLeft' && x > 0 && grid[y][x-1] === 0) {
        x -= 1;
    } else if (e.key === "ArrowRight" && x < grid_width-1 && grid[y][x+1] === 0) {
        x += 1;
    } else if (e.key === "ArrowDown" && y < grid_height-1 && grid[y+1][x] === 0) {
        y += 1;
    }
    draw();
    e.preventDefault();
}
document.addEventListener('keydown', keyDownHandler);

function advance() {
    if (y < grid_height-1 && grid[y+1][x] === 0) {
        y+=1;
    } else {
        x=Math.floor(grid_width/2);
        y=0;
        currentBlockType = blockType[Math.floor(Math.random()*5)];
        grid = structuredClone(new_grid);
    }
}

function draw() {
    new_grid = structuredClone(grid);
    positionBlock();
    drawGrid();
    drawSkeleton();
}

function start() {
    grid = structuredClone(clear_grid);
    y=0;

    if (!advanceInterval && !drawInterval) {
        advanceInterval = setInterval(advance, 500)
        drawInterval = setInterval(draw, 500);
    }
}

function stop() {
    clearInterval(advanceInterval);
    clearInterval(drawInterval);
    advanceInterval = null;
    drawInterval = null;
}