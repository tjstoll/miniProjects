# Tetris

Date created: 23-Jan-04

## Grid
The grid is the the container that holds the state of the game. From a visual perspective it provides information on what colour block to render on the canvas based on the numbers in the grid. From a gameplay perspective it keeps track  of the progression of the game (i.e. where the pieces are, which rows to eliminate, etc.).

### Structure:
```
[
    [0,0,0,...],
    [0,0,0,...],
    ...
]
```

### Methods acting upon the grid:
```
positionBlock(grid: list, blockCoords: list, colour: int) {
    \\ blockCoords: [[y1, x1], ... , [y4, x4]]

    for coord in blockCoords:
        grid[coord[0]][coord[1]] = colour
}
```
```
eliminateFullRows(grid: list) {
    for row in grid:
        if 0 is not in row:
            del row in grid
            append empty row to top of grid
}
```

## Game Piece
There are 5 pieces in Tetris:
- Straight
- Square
- Skew
- L
- T

These are the objects which populate the grid. They hold the structure of each game piece.

### Structure:
Each piece is constrained by 4 coordinates. Each coordinate is parameterized by an equation that describes where the block in the piece is to be placed:
```
[
    [y1, x1],
    [y2, x2],
    [y3, x3],
    [y4, x3]
]

where
yi: yi(y,x)
xi: xi(y,x)
```
For each piece there is a function that calculate the coordinates of the game piece for each orientation:
```
buildGAMEPIECE(y: int, x: int, orientation: int) {
    depending on orientation:
        return [[y1, x1], ... ,[y4,x4]]
}
```

As of yet, there are no methods acting on the game piece explicitly. There are, however, properties that dictate the behaviour of the pieces:
- x
- y
- orientation

These are updated globally throughout the game through user input.

### Methods acting on game piece propperties:
```
isCollision(y: int, x: int, orientation: int, currentGamePiece: str) {
    build potential game piece given y, x, and orientation
    let collisionMap = potentialGamePiece.map((coord) => {
        return value of grid at coord
    })
    let addListValues = (list) => {
        return sum of values in list
    }

    return addListValues(collisionMap) > 0;
}
```

```
handleUserInput(e: event, y: int, x: int, orientation: int) {
    if e is left key and no left collision:
        if !(isCollision(y, x-1, orientation)):
            x-1
    if e is right key and no right collision:
        if !(isCollision(y, x+1, orientation)):
            x+1;
    if e is down key and no down collision:
        if !(isCollision(y-1, x, orientation)):
            y+1
    if e is up key and no rotation collision:
        calculate potential orientation
        if  !(isCollision(y, x, potentialOrientation)):
            update orientation

    redraw the canvas to show updates
    e.preventDefault();
}
```