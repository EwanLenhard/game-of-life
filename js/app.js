const grid = [ 
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0]
];
const evolvedGrid = structuredClone(grid);
console.table(grid);

function displayGridValues() {
    for (y = 1; y < 5; y++) {
        for (x = 1; x < 5; x++) {
            console.log('y Position: ' + y);
            console.log('x Position: ' + x);
            console.log('Wert: ' + grid[y][x]);
            console.log('NeighbourCount: ' + countNeighbourCells(y, x));
            lifeCheck(y, x);
            console.log('--------');
        }
    }
    console.table(evolvedGrid);
}
function countNeighbourCells(y, x) {
    let neighbourCount = 0;
    neighbourCount = neighbourCount + grid[y-1][x];
    neighbourCount = neighbourCount + grid[y-1][x+1];
    neighbourCount = neighbourCount + grid[y][x+1];
    neighbourCount = neighbourCount + grid[y+1][x+1];
    neighbourCount = neighbourCount + grid[y+1][x];
    neighbourCount = neighbourCount + grid[y+1][x-1];
    neighbourCount = neighbourCount + grid[y][x-1];
    neighbourCount = neighbourCount + grid[y-1][x-1];
    return neighbourCount;
}
function lifeCheck(y, x) {
    const value = grid[y][x];
    const neighbourCount = countNeighbourCells(y, x);
    if (value === 0) {
        if (neighbourCount === 3) {
            evolvedGrid[y][x] = 1;
            console.log('birth');
        } else {
            evolvedGrid[y][x] = 0;
            console.log('death');
        }
    } else {
        if (neighbourCount === 3 || neighbourCount === 2) {
            evolvedGrid[y][x] = 1;
            console.log ('alive');
        } else {
            evolvedGrid[y][x] = 0;
            console.log ('death');
        }
    }
}
displayGridValues();
