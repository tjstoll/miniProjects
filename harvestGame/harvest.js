"use strict";

const field = document.querySelector("#field");
const ctx = field.getContext("2d");
const field_height = field.clientHeight;
const field_width = field.clientWidth;

const play_button = document.querySelector("#play_button");
const quit_button = document.querySelector("#quit_button");
let in_play = false;

const farmer_size = 20;
let x;
let y;
let dx;
let dy;
let key_pressed = "";

const fruit_size = 10;

function drawFarmer() {
    ctx.beginPath();
    ctx.rect(x, y, farmer_size, farmer_size);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.closePath();
}

function moveFarmer() {
    switch (key_pressed) {
        case "ArrowLeft":
            if (x >= 0) {
                x += -dx;
            }
            break;
        case "ArrowRight":
            if (x <= field_width - farmer_size) {
                x += dx;
            }
            break;
        case "ArrowUp":
            if (y >= 0) {
                y += -dy;
            }
            break;
        case "ArrowDown":
            if (y <= field_height - farmer_size) {
                y += dy;
            }
            break;

        default:
                break;
    }
}

function keyDownHandler(e) {
    key_pressed = e.key
    if (
        key_pressed === "ArrowLeft" ||
        key_pressed === "ArrowRight" ||
        key_pressed === "ArrowUp" ||
        key_pressed === "ArrowDown"
    )
    {
        moveFarmer();
        e.preventDefault();
    }
}

function keyUpHandler() {
    key_pressed = "";
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function draw() {
    ctx.clearRect(0, 0, field_width, field_height);
    drawFarmer();
    moveFarmer();

    if (in_play) {
        requestAnimationFrame(draw);
    }
    else {
        console.log("Goodbye");
        return;
    }
}

function play() {
    play_button.disabled = true;
    quit_button.disabled = false;
    in_play = true;
    x = (field_width - farmer_size)/2;
    y = (field_height - farmer_size)/2;
    dx = 3;
    dy = 3;

    draw();
}

function quit() {
    in_play = false;
    play_button.disabled = false;
    quit_button.disabled = true;
}