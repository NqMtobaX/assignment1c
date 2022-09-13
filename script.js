var size = 50;
var htmlElements;
var cells;
var EMPTY = 0;
var ALIVE = 1;

function createField() {
    htmlElements = [];
    cells = [];
    var table = document.getElementById('field');
    for (var y = 0; y < size; y++) {
        var tr = document.createElement('tr');
        var tdElements = [];
        cells.push(new Array(size).fill(EMPTY));
        htmlElements.push(tdElements);
        table.appendChild(tr);
        for(var x = 0; x < size; x++) {
            tdElements.push(td);
            tr.appendChild(td);
        }
    }
}
function draw() {
    for (var y = 0; y < size; y++){
        for (var x = 0; x < size; x++){
            htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == 1 ? 'filled' : 'empty'));
        }
    }
}
function countNeighbors(x, y) {  
    var count = 0;
    for (dy = -1; dy <= 1; dy++){
        for (dx = -1; dx <= 1; dx++){
            var nx = (x + dx + size) % size, ny = (y + dy + size) % size;
            count = count + cells[ny][nx];
        }
    } 
    return count - cells[y][x];
}
function newGeneration() {
    var newCells = [];
    for (var i = 0; i < size; i++) {
        newCells.push(new Array(size).fill(EMPTY));
    }
    for (var y = 0; y < size; y++){
        for (var x = 0; x < size; x++){
            var neighbours = countNeighbors(x, y);
            if (cells[y][x] == EMPTY && neighbours == 3) {
                newCells[y][x] = ALIVE;
            }
            if (cells[y][x] == ALIVE && (neighbours == 2 || neighbours == 3)){
                newCells[y][x] = ALIVE;
            }
        }
    }
    cells = newCells;
}
function init() {
    createField();
    for (var i = 0; i < Math.floor(size * size * 0.3); i++) {
        var x, y;
        do{
            x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size);
            if (cells[y][x] == EMPTY){
                cells[y][x] == ALIVE;
                break;
            }
        } while (true);
    }
    draw();
    setInterval(newGeneration, 100);
}
init();