# Tetris

The project mainly uses the module 1 technique to implement Tetris as the game history legend. The rules of the game are simple. When a line is filled while stacking blocks, the line disappears. The game holds out until the end so that the blocks do not accumulate to the top. The player needs to pass the stage with a particular score.

## Technologies:
1. DOM methods
:`addEventlistner()`
,`document.querySelector()`
,`appendChild()`
,`createElement`
2. function method
:`forEach()`
,`Object.assign()`
3. ES6 javascript
:` destructure`

## Approach:

1. Setting
<br>Tetris's playground, the grid, is formed by HTML elements `ul` and `li` without using canvas. The `ul` and `li` nodes can access like an array.
For 10 x 20 grid, variable `gridRow`, `gridColumn` should be declared by each 10 and 20. 
After making a 2-dimensional list array with nested for loop, the CSS class will take the HTML element to style the grids.

2. Shapes
<br>The basic block structure contains `type`, `direction`,`left`,`top`. Depending on each index, Tetris blocks can be built up. The variable `blocks` has the grid indexes arrays, including rotated shapes. Coloring also  

3. Moving
<br>To handle blocks by keyboard, `eventListener` and `keyCode` are set up with if statement. 


## Technical Challenge
1. Only using pure HTML, CSS, Javascript, no package.
2. Rotating the blocks with the up keypress.
4. Stack the blocks.
5. Erase the previous block moves. 
6. Erase the one-line block.
7. The blocks don't get out of the playground within the playground.
8. Seize the blocks.  

## Unsolved problem
1. The blocks didn't go out, but there are error messages from undefined blocks. 
2. Stack the blocks.
3. Erase the one-line block.
