"use strict";

let box_controls = {};

const result = document.querySelector('#result');

function updateProperty() {
    Object.assign(result.style, box_controls);
}

function changeProperty(property, value) {
    box_controls[property] = value;
    updateProperty();
}