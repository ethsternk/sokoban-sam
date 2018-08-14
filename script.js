const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

// W = Wall
// S = Starting position
// ' ' = open floor
// O = storage location
// B = crate
// X = sotarge location with box on it

const grid = [];
const player = document.getElementById("player")
const main = document.querySelector("main");

// This loop is creating a div for each column
for (let rowIndex in map) {
    const mapRow = map[rowIndex];

    const rowElement = document.createElement("div")
    rowElement.classList.add("row")
    main.appendChild(rowElement)
    grid[rowIndex] = [];

    // This loop is creating cell divs inside of the columns

    for (let cellIndex in mapRow) {
        const typeOfCell = mapRow[cellIndex];

        const cellElement = document.createElement("div")
        cellElement.classList.add("cell")
        rowElement.appendChild(cellElement)

        // telling every cell its own position in grid, so that we can ask it later where it is
        grid[rowIndex][cellIndex] = cellElement
        cellElement.dataset.rowIndex = rowIndex
        cellElement.dataset.cellIndex = cellIndex

        if (typeOfCell === "S") {
            cellElement.appendChild(player);
        }
        if (typeOfCell === "W") {
            cellElement.classList.add("wall")
        }
        if (typeOfCell === "O") {
            cellElement.classList.add("emptyStorage")
        }
        if (typeOfCell === "B") {
            cellElement.classList.add("crate")
        }
        if (typeOfCell === "X") {
            cellElement.classList.add("fullStorage")
        }

    }
}

console.table(grid)


document.addEventListener('keydown', (event) => {
    if (event.key.indexOf("Arrow") === -1) return null

    // this is where we ask the parent cell where it is in the grid
    const currentRowIndex = Number(player.parentElement.dataset.rowIndex)
    const currentCellIndex = Number(player.parentElement.dataset.cellIndex)

    let targetCell = undefined

    if (event.key === "ArrowRight") {
        console.log("right")

        targetCell = grid[currentRowIndex][currentCellIndex + 1]
        targetCell2 = grid[currentRowIndex][currentCellIndex + 2]

    } else if (event.key === "ArrowUp") {
        console.log("up")

        targetCell = grid[currentRowIndex - 1][currentCellIndex]
        targetCell2 = grid[currentRowIndex - 2][currentCellIndex]

    } else if (event.key === "ArrowDown") {
        console.log("down")

        targetCell = grid[currentRowIndex + 1][currentCellIndex]
        targetCell2 = grid[currentRowIndex + 2][currentCellIndex]

    } else if (event.key === "ArrowLeft") {
        console.log("left")

        targetCell = grid[currentRowIndex][currentCellIndex - 1]
        targetCell2 = grid[currentRowIndex][currentCellIndex - 2]

    }

    if (targetCell) {

        // if NO wall
        if (targetCell.className.indexOf("wall") === -1) {
            // if NO crate
            if (targetCell.className.indexOf("crate") === -1) {
                // if NO fruit
                if (targetCell.className.indexOf("fullStorage") === -1) {
                    // move player
                    targetCell.appendChild(player)
                    // if fruit
                } else {
                    // if2 NOT wall/crate/fruit
                    if (targetCell2.className.indexOf("wall") === -1 &&
                        targetCell2.className.indexOf("crate") === -1 &&
                        targetCell2.className.indexOf("fullStorage") === -1) {
                        // if2 NOT fruit
                        if (targetCell2.className.indexOf("emptyStorage") === -1) {
                            // move player crate
                            targetCell.appendChild(player)
                            targetCell.classList.remove("fullStorage");
                            targetCell.classList.add("emptyStorage");
                            targetCell2.classList.add("crate");
                        // if2 fruit
                        } else {
                            // move player fruit
                            targetCell.appendChild(player)
                            targetCell.classList.remove("fullStorage");
                            targetCell.classList.add("emptyStorage");
                            targetCell2.classList.add("fullStorage");
                        }
                    }
                }
                // if crate
            } else {
                // if2 NOT wall/crate/fruit
                if (targetCell2.className.indexOf("wall") === -1 &&
                    targetCell2.className.indexOf("crate") === -1 &&
                    targetCell2.className.indexOf("fullStorage") === -1) {
                    // if2 NOT fruit
                    if (targetCell2.className.indexOf("emptyStorage") === -1) {
                        // move player crate
                        targetCell.appendChild(player)
                        targetCell.classList.remove("crate");
                        targetCell2.classList.add("crate");
                        // if2 fruit
                    } else {
                        // move player fruit
                        targetCell.appendChild(player)
                        targetCell.classList.remove("crate");
                        targetCell2.classList.add("fullStorage");
                    }
                }
            }
        }

        boxCount = 0;
        for (let y = 0; y < grid.length - 1; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let cell = grid[x][y];
                if (cell.className.indexOf("crate") !== -1) {
                    boxCount++;
                }
            }
        }
        console.log("boxCount: ", boxCount)
        if (boxCount === 0) {
            alert("YOU WIN");
        }
    }

});