"use strict";

var article1 = document.getElementById("article-1");
var article2 = document.getElementById("article-2");

function move(dir) {
    if (dir > 0) {
        article1.style.left = "0%";
        article2.style.left = "100%";
    }
    
    else {
        article1.style.left = "-100%";
        article2.style.left = "0%";
    }
    
    console.log(article1.style.left);
}