const grid = [ 
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0]
];

console.table(grid);

function displayGridValues() {
    for (col = 1; col < 5; col++) {
        for (row = 1; row < 5; row++) {
            console.log('Col Position: ' + col);
            console.log('Row Position: ' + row);
            console.log('Wert: ' + grid[col][row]);
            console.log('--------');
        }
    }
}
function identifyNeighbourCells() {
    
}
displayGridValues();