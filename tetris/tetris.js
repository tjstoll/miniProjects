'use strict';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const canvas_height = canvas.clientHeight;
const canvas_width = canvas.clientWidth;

const blockSize = 15;

function drawUnitBlock(x,y) {
    ctx.beginPath();
    ctx.rect(x,y, blockSize, blockSize);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.closePath();
}

function drawStrait(x, y, orientation) {
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

// Just looking at the peices
drawStrait(blockSize, blockSize, 0);
drawStrait(3*blockSize, blockSize, 1);

drawL(blockSize, 8*blockSize, 0);
drawL(4*blockSize, 8*blockSize, 1);
drawL(9*blockSize, 8*blockSize, 2);
drawL(11*blockSize, 8*blockSize, 3);

drawSquare(blockSize, 14*blockSize);

drawT(blockSize, 19*blockSize, 0);
drawT(5*blockSize, 19*blockSize, 1);
drawT(8*blockSize, 19*blockSize, 2);
drawT(13*blockSize, 19*blockSize, 3);

drawSkew(2*blockSize, 24*blockSize, 0);
drawSkew(5*blockSize, 24*blockSize, 1);