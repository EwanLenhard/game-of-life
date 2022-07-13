let grid = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0]
];

const gridContainerElement = document.getElementById('cell-container');

function createRandomGrid(ySize, xSize) {
    let randomGrid = [];
    randomGrid[0] = new Array(xSize + 2).fill(0);
    randomGrid[ySize + 1] = new Array(xSize + 2).fill(0);
    for (y = 1; y < ySize + 1; y++) {
        randomGrid[y] = [];
        randomGrid[y][0] = 0;
        randomGrid[y][xSize + 1] = 0;
        for (x = 1; x < xSize + 1; x++) {
            randomGrid[y][x] = getRandomInt(2);
        }
    }
    console.table(randomGrid);
    return randomGrid;
}

var _isPaused=false;

function showRandomGrid(ySize, xSize) {
    let randomGrid = createRandomGrid(ySize, xSize);
    deleteGrid();
    grid = randomGrid;
    setGridSize(ySize, xSize);
    for (y = 1; y < grid.length - 1; y++) {
        for (x = 1; x < grid[y].length - 1; x++) {
            showEvolvedGrid(grid, y, x);
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function createEvolvedGrid(grid, newGrid) {
    for (y = 1; y < grid.length - 1; y++) {
        for (x = 1; x < grid[y].length - 1; x++) {
            prepareEvolvedGrid(grid, newGrid, y, x);
            showEvolvedGrid(grid, y, x);
        }
    }
}

function countNeighborCells(grid, y, x) {
    let neighborCount = 0;
    neighborCount = neighborCount + grid[y-1][x];
    neighborCount = neighborCount + grid[y-1][x+1];
    neighborCount = neighborCount + grid[y][x+1];
    neighborCount = neighborCount + grid[y+1][x+1];
    neighborCount = neighborCount + grid[y+1][x];
    neighborCount = neighborCount + grid[y+1][x-1];
    neighborCount = neighborCount + grid[y][x-1];
    neighborCount = neighborCount + grid[y-1][x-1];
    return neighborCount;
}

function prepareEvolvedGrid(grid, newGrid, y, x) {
    const value = grid[y][x];
    const neighborCount = countNeighborCells(grid, y, x);
    if (value === 0) {
        if (neighborCount === 3) {
            newGrid[y][x] = 1;
            console.log('birth');
        } else {
            newGrid[y][x] = 0;
            console.log('death');
        }
    } else {
        if (neighborCount === 3 || neighborCount === 2) {
            newGrid[y][x] = 1;
            console.log ('alive');
        } else {
            newGrid[y][x] = 0;
            console.log ('death');
        }
    }
}

function showEvolvedGrid(grid, y, x) {
    const cell = document.createElement('div');
    cell.setAttribute('class', 'cell')
    if (grid[y][x] === 1) {
        cell.setAttribute('class', 'alive');
    } else {
        cell.setAttribute('class', 'dead');
        }
    cell.innerHTML = grid[y][x];
    gridContainerElement.appendChild(cell);
}

function setGridSize(ySize, xSize) {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`
        #cell-container {
            display: grid;
            grid-template-columns: repeat(${xSize}, 45px);
            grid-template-rows: repeat(${ySize}, 45px);
            gap: 5px;
        }
    `
    )
}

function cloneGrid(grid) {
    return structuredClone(grid);
}

function deleteGrid() {
    gridContainerElement.innerHTML = '';
}

function startSimulation() {
    var loopTimeout = function(i, interval, func) {

        if(!_isPaused) {
            return;
        }
        // Call the function
        func(i);

        i++;

        // "loop"
        setTimeout(function() {
            loopTimeout(i, interval, func);
        }, interval);
    }
    loopTimeout(0, 300, function(i) {
        let newGrid = cloneGrid(grid);
        deleteGrid();
        createEvolvedGrid(grid, newGrid);
        grid = newGrid;
    });
}

setGridSize(grid.length - 2);

function startOrStop() {
    _isPaused = !_isPaused;
    console.log (_isPaused);
    if(_isPaused) {
        startSimulation();
    }
}

function nextEvolution() {
    let newGrid = cloneGrid(grid);
    deleteGrid();
    createEvolvedGrid(grid, newGrid);
    grid = newGrid;
}
