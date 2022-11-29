"use strict";

// Collect all slides in the carousel
var carousel_slides = document.getElementsByClassName("carousel-slide");
var number_of_slides = carousel_slides.length;
var index = 0; // for navigating through the slides

// Create navigation dots for each slide in the carousel
var _navigation_dots = document.getElementById("navigation-dots");
var dot = document.createElement("i");
dot.classList.add("fa-solid", "fa-circle", "dot");
var unique_dot = null;

//add number_of_slides-1 dots to navigation_dots
for (let x=1; x<number_of_slides; x++) {
    unique_dot = dot.cloneNode();
    unique_dot.addEventListener("click", function() {jumpTo(x)});
    _navigation_dots.appendChild(unique_dot);
}

var navigation_dots = _navigation_dots.children;

// hide all slides except the first
for (let i=1; i<number_of_slides; i++) {
    carousel_slides[i].style.display = "none";
}

function move(dir) {
    // get slide at index and set display to hidden
    carousel_slides[index].style.display = "none";
    navigation_dots[index].removeAttribute("id");
    
    // increment index by dir
    index += dir;
    
    // if index is beyond the maximum/minimum index of slides then set index to 0;
    if (index > (number_of_slides-1)) {
        index = 0;
    }
    else if (index < 0) {
        index = number_of_slides-1;
    }
    else {}
    
    // find slide at index and set style to display block and left 0
    carousel_slides[index].style.display = "flex";
    navigation_dots[index].id = "active-dot";
}

function jumpTo(ind) {
    carousel_slides[index].style.display = "none";
    navigation_dots[index].removeAttribute("id");
    
    index = ind;
    
    carousel_slides[index].style.display = "flex";
    navigation_dots[index].id = "active-dot";
}