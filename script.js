const startButton = document.querySelector("#start-btn");
const resetButton = document.querySelector("#reset-btn");
const message = document.querySelector("#message");
const gameBoard = document.querySelector("#game-board");
const gameBoardSize = 9;
const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let player = "X";

document.addEventListener("DOMContentLoaded", function () {
    loadGameBoard();

    startButton.addEventListener("click", startGame);
});

function loadGameBoard() {
    for (let i = 0; i < gameBoardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = "cell-" + i;
        gameBoard.appendChild(cell);
    }
}

function startGame() {
    message.textContent = "Player " + player + "'s turn";
    startButton.disabled = true;
    resetButton.disabled = false;

    gameBoard.addEventListener("click", handleCellClick);
    resetButton.addEventListener("click", resetGame);
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.id.split("-")[1];
    if (cell.textContent === "") {
        cell.textContent = player;
        gameBoardArray[cellIndex] = player;
        if (checkWin()) {
            message.innerText = "Player " + player + " wins!";
            gameBoard.removeEventListener("click", handleCellClick);
            return;
        } else if (checkDraw()) {
            message.innerText = "It's a draw!";
            gameBoard.removeEventListener("click", handleCellClick);
            return;
        } else {
            player = player === "X" ? "O" : "X";
        }

        message.textContent = "Player " + player + "'s turn";
    } else {
        return;
    }
}

function resetGame() {
    resetButton.disabled = true;
    startButton.disabled = false;
    message.textContent = "Let's play a round!";

    gameBoardArray.fill("");
    gameBoard.removeEventListener("click", handleCellClick);
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => (cell.textContent = ""));
    player = "X";
}

function checkWin() {
    return winningCombos.some((combo) => {
        // some() returns true if at least one element in the array passes the test
        return combo.every((index) => {
            // every() returns true if all elements in the array pass the test
            return gameBoardArray[index - 1] === player;
        });
    });
}

function checkDraw() {
    return gameBoardArray.every((cell) => {
        return cell !== "";
    });
}
