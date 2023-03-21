'use strict';

// Just looking at the peices
// drawStraight(blockSize, blockSize, 0);
// drawStraight(3*blockSize, blockSize, 1);

// drawL(blockSize, 8*blockSize, 0);
// drawL(4*blockSize, 8*blockSize, 1);
// drawL(9*blockSize, 8*blockSize, 2);
// drawL(11*blockSize, 8*blockSize, 3);

// drawSquare(blockSize, 14*blockSize);

// drawT(blockSize, 19*blockSize, 0);
// drawT(5*blockSize, 19*blockSize, 1);
// drawT(8*blockSize, 19*blockSize, 2);
// drawT(13*blockSize, 19*blockSize, 3);

// drawSkew(2*blockSize, 24*blockSize, 0);
// drawSkew(5*blockSize, 24*blockSize, 1);

let test_grid = [
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

let test_grid_width = test_grid[0].length
let test_grid_height = test_grid.length

function buildgrid() {
    let test_string = '';
    for (let k=0; k<test_grid_height; k++) {
        test_string += test_grid[k].join('') + '\n';
    }
    console.log(test_string);
}

function drawBlock(i, j) {
    test_grid[i][j] = 1;
}