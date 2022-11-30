'use strict';

var menu = document.getElementById("menu");
function toggleMenu() {
    if (menu.style.display === "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
}