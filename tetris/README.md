# Tetris

Date created: 23-Jan-04

## Basic Structure
- index.html: container for the game board and controls
- styles.css: styles the only the page and its contents except the canvas
- skeletonTetris.js: gameloop and controls

## Overview of how it works
- Generates a random gamepiece with x and y coordinates
- renders gamepiece to the canvas
- gameloop continually updates y coordinate at a set interval
- gameloop also renders gamepiece to canvas at the smae set interval (to ensure gamepiece advances)
- player inputs controls to move/rotate gamepiece
- render function calls immediately to update gameboard
- at every update collision detection runs
- depending on collision status gamepiece continues updating y coordinate or is out of play and generates new gamepiece or ends the game 