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

console.log(grid)


document.addEventListener('keydown', (event) => {
    if (event.key.indexOf("Arrow") === -1) return null

    // this is where we ask the parent cell where it is in the grid
    const currentRowIndex = Number(player.parentElement.dataset.rowIndex)
    const currentCellIndex = Number(player.parentElement.dataset.cellIndex)

    let targetCell = undefined

    if (event.key === "ArrowRight") {
        console.log("right")

        targetCell = grid[currentRowIndex][currentCellIndex + 1]

    } else if (event.key === "ArrowUp") {
        console.log("up")

        targetCell = grid[currentRowIndex - 1][currentCellIndex]

    } else if (event.key === "ArrowDown") {
        console.log("down")

        targetCell = grid[currentRowIndex + 1][currentCellIndex]

    } else if (event.key === "ArrowLeft") {
        console.log("left")

        targetCell = grid[currentRowIndex][currentCellIndex - 1]

    }

    if (targetCell) {

        if (targetCell.className.indexOf("wall") === -1) {
            targetCell.appendChild(player)
        }

        if (targetCell.className.indexOf("finish") !== -1) {
            console.log("finish")
            alert("You win!!");
        }
    }

});