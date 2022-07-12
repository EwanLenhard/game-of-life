let grid = [ 
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0]
];

const gridContainerElement = document.getElementById('cell-container');

var _isPaused=false;

function creatEvolvedGrid(grid, newGrid) {
    for (y = 1; y < grid.length - 1; y++) {
        for (x = 1; x < grid[y].length - 1; x++) {
            prepareEvolvedGrid(grid, newGrid, y, x);
            showEvolvedGrid(grid, y, x);
        }
    }
}

function countNeighbourCells(grid, y, x) {
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

function prepareEvolvedGrid(grid, newGrid, y, x) {
    const value = grid[y][x];
    const neighbourCount = countNeighbourCells(grid, y, x);
    if (value === 0) {
        if (neighbourCount === 3) {
            newGrid[y][x] = 1;
            console.log('birth');
        } else {
            newGrid[y][x] = 0;
            console.log('death');
        }
    } else {
        if (neighbourCount === 3 || neighbourCount === 2) {
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

function setGridSize(size) {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`
        #cell-container {
            display: grid;
            grid-template-columns: repeat(${size}, 45px);
            grid-template-rows: repeat(${size}, 45px);
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
        creatEvolvedGrid(grid, newGrid);
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

function nextEvoulution() {
    let newGrid = cloneGrid(grid);
    deleteGrid();
    creatEvolvedGrid(grid, newGrid);
    grid = newGrid;
}