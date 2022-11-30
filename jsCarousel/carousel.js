"use strict";

// Collect all slides in the carousel
let carousel_slides = document.getElementsByClassName("carousel-slide");
let number_of_slides = carousel_slides.length;

// global variable for keeping track of active slide
let index = 0;

// Create navigation dot for each slide in the carousel
let _navigation_dots = document.getElementById("navigation-dots");
let dot = document.createElement("i");
dot.classList.add("fa-solid", "fa-circle", "dot");
let unique_dot;

//add number_of_slides-1 dots to navigation_dots
for (let x=1; x<number_of_slides; x++) {
    unique_dot = dot.cloneNode();
    unique_dot.addEventListener("click", function() {changeSlide('jump-to', x)});
    _navigation_dots.appendChild(unique_dot);
}

// gather all the dots in an HTML collection
let navigation_dots = _navigation_dots.children;

// hide all slides except the first
for (let i=1; i<number_of_slides; i++) {
    carousel_slides[i].style.display = "none";
}

function changeSlide(action, value) {
    // hide previous slide
    // deactivate previous dot
    // set index to desired slide
    // display current slide
    //activate current dot
    
    // get slide at index and set display to flex
    // get corresponding dot and deactivate
    carousel_slides[index].style.display = "none";
    navigation_dots[index].removeAttribute("id");
    
    // update the index based on the action specified    
    switch (action) {
        case "move-right": {
            // increment index +1 if not out of range
            if (index === number_of_slides-1) {
                index = 0;
            }
            else {
                index += 1;
            }
            break;
        }
        
        case "move-left": {
            // increment index -1 if not out of range
            if (index === 0) {
                index = number_of_slides-1;
            }
            else {
                index -= 1;
            }
            break;
        }
        
        case "jump-to": {
            index = value;
            break;
        }
    }
            
    // get slide at index and set display to flex
    // get corresponding dot and set to active
    carousel_slides[index].style.display = "flex";
    navigation_dots[index].id = "active-dot";
}