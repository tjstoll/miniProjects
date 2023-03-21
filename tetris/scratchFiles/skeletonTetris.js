'use strict';

const consoleGrid = document.querySelector("#console");
const clear_grid = [
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

let advanceInterval;
let drawInterval;
let x=Math.floor(grid_width/2);
let y=0;

function positionBlock() {
    new_grid[y][x] = 1;
}

function drawGrid() {
    let test_string = '';
    for (let k=0; k<grid_height; k++) {
        test_string += new_grid[k].join('') + '<br>';
    }
    consoleGrid.innerHTML = test_string;
}

function keyDownHandler(e) {
    if (e.key === 'ArrowLeft' && x > 0 && grid[y][x-1] === 0) {
        x -= 1;
    } else if (e.key === "ArrowRight" && x < grid_width-1 && grid[y][x+1] === 0) {
        x += 1;
    }
    draw();
    e.preventDefault;
}
document.addEventListener('keydown', keyDownHandler);

function advance() {
    if (y < grid_height-1 && grid[y+1][x] === 0) {
        y+=1;
    } else {
        x=Math.floor(grid_width/2);
        y=0;
        grid = structuredClone(new_grid);
    }
}

function draw() {
    new_grid = structuredClone(grid);
    positionBlock();
    drawGrid();
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