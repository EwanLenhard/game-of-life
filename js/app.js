let grid;

const gridContainerElement = document.getElementById('cell-container');
const playButton = document.getElementById('play-button');

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const headerHeight = document.getElementById('header').offsetHeight;

let ySize = 0;
let xSize = 0;

let cellSize = 30; /* TODO should be changeable by user */

let _isPaused = false;
let animationShouldStart = false;

function getMaxGrid(dimension) {
    let amountgridItems = dimension / (cellSize + 1);
    if (parseInt(dimension / amountgridItems) <= cellSize + 1) {
        amountgridItems--;
    }
    return parseInt(amountgridItems);
}

ySize = getMaxGrid(viewportHeight - headerHeight);
xSize = getMaxGrid(viewportWidth);

function start() {
    hideOverlay();
    showRandomGrid(ySize, xSize);
    startSimulation();
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style['display'] = 'none';
}

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
    return randomGrid;
}



function showRandomGrid() {
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
            attachClickListener();
        }
    }
}

function attachClickListener() {

    if (!_isPaused) {
        return;
    }

    gridContainerElement.onclick = function(event) {
        const target = event.target;

        /** If you click on the border line it will be interpreted as a click on the gridContainerElement, but we are
         * only interested in a cell, so we need to find out if it's cell and only handle these
         */
        if (target === gridContainerElement) {
            return;
        }

        const cell = target;

        const yPos = cell.getAttribute('data-y');
        const xPos = cell.getAttribute('data-x');
        toggleCellState(cell, yPos, xPos);
    }
}

function toggleCellState(cellNode, yPos, xPos) {
    if (grid[yPos][xPos] === 1) {
        cellNode.setAttribute('class', 'dead');
        grid[yPos][xPos] = 0;
    } else {
        cellNode.setAttribute('class', 'alive');
        grid[yPos][xPos] = 1;
    }
}

function toggleEditMode(toggle) {
    if (toggle) {
        gridContainerElement.setAttribute('class', 'editing-active');
    } else {
        gridContainerElement.removeAttribute('class');
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
        } else {
            newGrid[y][x] = 0;
        }
    } else {
        if (neighborCount === 3 || neighborCount === 2) {
            newGrid[y][x] = 1;
        } else {
            newGrid[y][x] = 0;
        }
    }
}

function showEvolvedGrid(grid, y, x) {
    const cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('data-x', x);
    cell.setAttribute('data-y', y);
    if (grid[y][x] === 1) {
        cell.setAttribute('class', 'alive');
    } else {
        cell.setAttribute('class', 'dead');
    }
    gridContainerElement.appendChild(cell);
}

function setGridSize(ySize, xSize) {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`
        #cell-container {
            display: grid;
            grid-template-columns: repeat(${xSize}, ${cellSize}px);
            grid-template-rows: repeat(${ySize}, ${cellSize}px);
            gap: 1px;
            padding-top: 30px;
            justify-self: center;
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

function removeClickListener() {
    gridContainerElement.removeEventListener("click", attachClickListener);
}

function startLoop() {
    var loopTimeout = function(i, interval, func) {

        if (_isPaused) {
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

function startOrStop() {
    if (_isPaused) {
        startSimulation();
    } else {
        stopSimulation();
    }
}

function startSimulation() {
    _isPaused = false;
    removeClickListener();
    toggleEditMode(false);
    startLoop();
    playButton.setAttribute('class', 'pause');
}

function stopSimulation() {
    _isPaused = true;
    playButton.setAttribute('class', 'play');
    toggleEditMode(true);
    attachClickListener();
}

function nextEvolution() {
    let newGrid = cloneGrid(grid);
    deleteGrid();
    createEvolvedGrid(grid, newGrid);
    grid = newGrid;
}

function help() {
    const overlay = document.getElementById('helpOverlay');
    overlay.style['display'] = 'flex';
    if (!_isPaused) {
        animationShouldStart = true;
        stopSimulation();
    }

}

function hideHelpOverlay() {
    const overlay = document.getElementById('helpOverlay');
    overlay.style['display'] = 'none';
    if (animationShouldStart) {
        animationShouldStart = false;
        startSimulation();
    }
}



function createEmptyGrid(ySize, xSize){
    let newGrid = [];
    newGrid[0] = new Array(xSize + 2).fill(0);
    newGrid[ySize + 1] = new Array(xSize + 2).fill(0);
    for (y = 1; y < ySize + 1; y++) {
        newGrid[y] = [];
        newGrid[y][0] = 0;
        newGrid[y][xSize + 1] = 0;
        for (x = 1; x < xSize + 1; x++) {
        newGrid[y][x] = 0;
        }
    }
    return newGrid;
}

function showClearedGrid() {
    grid = createEmptyGrid(ySize, xSize);
    nextEvolution();
}
