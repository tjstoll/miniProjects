'use strict';

// Skeletion grid properties
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

// Mechanics basics
let advanceInterval;
let drawInterval;
let x=Math.floor(grid_width/2);
let y=0;

// Block properties
const blockSize = 20;
const blockType = ["straight","square","skew","T","L"];
let currentBlockType = blockType[Math.floor(Math.random()*5)];
let currentBlockProps;
let or = 0;

// Console properties
const consoleGrid = document.querySelector("#console");
const ctx = consoleGrid.getContext("2d");
consoleGrid.height = grid_height*blockSize;
consoleGrid.width = grid_width*blockSize;

const skeletonGrid = document.querySelector('#skeletonConsole');

function buildStraight(y,x,or) {
    let straightCoords;
    let colour = 1;

    if (or === 2) {
        or = 0;
    } else if (or === 3) {
        or = 1;
    }

    switch (or) {
        case 0:
            straightCoords = [[y,x],[y+1,x],[y+2,x],[y+3,x]];
            break;
        case 1:
            straightCoords = [[y,x-2],[y,x-1],[y,x],[y,x+1]];
            break;
    }
    return [straightCoords, colour];
}

function buildSquare(y,x) {
    let colour = 2;
    return [[[y,x],[y,x+1],[y+1,x],[y+1,x+1]], colour]
}

function buildSkew(y,x,or) {
    let skewCoords;
    let colour = 3;

    if (or === 2) {
        or = 0;
    } else if (or === 3) {
        or = 1;
    }

    switch (or) {
        case 0:
            skewCoords = [[y,x],[y,x+1],[y+1,x-1],[y+1,x]];
            break;
        case 1:
            skewCoords = [[y,x],[y+1,x],[y+1,x+1],[y+2,x+1]];
            break;
    }

    return [skewCoords, colour];
}

function buildT(y,x,or) {
    let Tcoords;
    let colour = 4;
    switch (or) {
        case 0:
            Tcoords =  [[y,x],[y+1,x-1],[y+1,x],[y+1,x+1]];
            break;
        case 1:
            Tcoords = [[y,x],[y+1,x],[y+1,x+1],[y+2,x]];
            break;
        case 2:
            Tcoords = [[y,x-1],[y,x],[y,x+1],[y+1,x]];
            break;
        case 3:
            Tcoords =  [[y,x],[y+1,x-1],[y+1,x],[y+2,x]];
            break;
    }

    return [Tcoords, colour];
}

function buildL(y,x,or) {
    let Lcoords;
    let colour = 5;
    switch (or) {
        case 0:
            Lcoords = [[y,x],[y+1,x],[y+2,x],[y+2,x+1]];
            break;
        case 1:
            Lcoords = [[y,x-1],[y,x],[y,x+1],[y+1,x-1]];
            break;
        case 2:
            Lcoords = [[y,x],[y,x+1],[y+1,x+1],[y+2,x+1]];
            break;
        case 3:
            Lcoords = [[y+1,x-1],[y+1,x],[y+1,x+1],[y,x+1]];
            break;
    }

    return [Lcoords, colour];
}

function buildCurrentBlock(or) {
    switch (currentBlockType) {
        case "straight":
            return buildStraight(y,x,or);
        case "square": 
            return buildSquare(y,x);
        case "skew":
            return buildSkew(y,x,or);
        case "T": 
            return buildT(y,x,or);
        case "L":
            return buildL(y,x,or);
    }
}

function positionBlock() {
    let coords = currentBlockProps[0];
    let colour = currentBlockProps[1];
    coords.forEach(coord => new_grid[coord[0]][coord[1]]=colour);
}

function drawBlock(row, col, colour) {
    // Draw a single block at (row,col) with colour
    ctx.beginPath();
    ctx.rect(col*blockSize, row*blockSize,blockSize,blockSize);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
}

function drawGrid() {
    // Flesh out the grid from the skeleton
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
    // DELETE
    // Display the skeleton
    let test_string = '';
    for (let row=0; row<grid_height; row++) {
        test_string += new_grid[row].join('') + '<br>';
    }
    skeletonGrid.innerHTML = test_string;
}

function isCollision(direction) {
    let collisionMap;

    switch (direction) {
        case "down":
            collisionMap = currentBlockProps[0].map(coord => {
                if (coord[0] < grid_height-1 && grid[coord[0]+1][coord[1]] === 0) {
                    return 0;
                } else {
                    return 1;
                }
            });
            break;

        case "left":
            collisionMap = currentBlockProps[0].map(coord => {
                if (coord[1] > 0 && grid[coord[0]][coord[1]-1] === 0) {
                    return 0;
                } else {
                    return 1;
                }
            });
            break;

        case "right":
            collisionMap = currentBlockProps[0].map(coord => {
                if (coord[1] < grid_width-1 && grid[coord[0]][coord[1]+1] === 0) {
                    return 0;
                } else {
                    return 1;
               }
            });
            break;

        case "rotate":
            collisionMap = currentBlockProps[0].map(coord => {
                if (coord[1]) {

                }
            });
            break;
    }

    let collisionStatus = collisionMap.reduce((val1, val2) => val1 + val2);
    if (collisionStatus > 0 ) {
        return true;
    } else {
        return false;
    }
}

function keyDownHandler(e) {
    // Handle user input
    if (e.key === 'ArrowLeft' && !(isCollision("left"))) {
        x -= 1;
    } else if (e.key === "ArrowRight" && !(isCollision("right"))) {
        x += 1;
    } else if (e.key === "ArrowDown" && !(isCollision("down"))) {
        y += 1;
    } else if (e.key === "ArrowUp") {
        let potential_or = or + 1;
        potential_or %= 4;
        currentBlockProps = buildCurrentBlock(potential_or);

        if (!(isCollision("right")) && !(isCollision("left"))) {
            or = potential_or;
        }
    }
    draw();
    e.preventDefault();
}
document.addEventListener('keydown', keyDownHandler);

function advance() {
    // Automatically move the block down the y axis
    
    if (isCollision("down")) {
        x=Math.floor(grid_width/2);
        y=0;
        or=0;
        currentBlockType = blockType[Math.floor(Math.random()*5)];
        grid = structuredClone(new_grid);
    } else {
        y+=1;
    }
}

function draw() {
    // Refresh the skeleton and the console
    new_grid = structuredClone(grid);
    
    currentBlockProps = buildCurrentBlock(or)
    positionBlock();
    drawGrid();
    drawSkeleton();
}

function start() {
    // Initialize a new game
    grid = structuredClone(clear_grid);
    y=0;

    if (!advanceInterval && !drawInterval) {
        advanceInterval = setInterval(advance, 500)
        drawInterval = setInterval(draw, 500);
    }

    console.log("game in play");
}

function stop() {
    // End the game
    clearInterval(advanceInterval);
    clearInterval(drawInterval);
    advanceInterval = null;
    drawInterval = null;

    console.log("game out of play");
}