"use strict";

var ponies = document.getElementsByClassName("pony");
var number_of_ponies = ponies.length;
var index = 0;

var dots_div = document.getElementById("dots");
var dot = document.createElement("i");
dot.classList.add("fa-solid", "fa-circle", "dot");
var unique_dot = null;

//add number_of_ponies-1 dots to navigation_dots
for (let x=1; x<number_of_ponies; x++) {
    unique_dot = dot.cloneNode();
    unique_dot.addEventListener("click", function() {jumpTo(x)});
    dots_div.appendChild(unique_dot);
}

var dot_list = dots_div.children;

// hide all ponies except the first
for (let i=1; i<number_of_ponies; i++) {
    ponies[i].style.display = "none";
}

function move(dir) {
    // get pony at index and set display to hidden
    ponies[index].style.display = "none";
    dot_list[index].removeAttribute("id");
    
    // increment index by dir
    index += dir;
    
    // if index is beyond the maximum/minimum index of ponies then set index to 0;
    if (index > (number_of_ponies-1)) {
        index = 0;
    }
    else if (index < 0) {
        index = number_of_ponies-1;
    }
    else {}
    
    // find pony at index and set style to display block and left 0
    ponies[index].style.display = "block";
    dot_list[index].id = "active-dot";
}

function jumpTo(ind) {
    ponies[index].style.display = "none";
    dot_list[index].removeAttribute("id");
    
    index = ind;
    
    ponies[index].style.display = "block";
    dot_list[index].id = "active-dot";
}