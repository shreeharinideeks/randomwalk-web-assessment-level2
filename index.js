// Select necessary elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Game variables
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Left diagonal
    [2, 4, 6]  // Right diagonal
];

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    // If cell is already filled or game is over, ignore the click
    if (boardState[cellIndex] !== '' || !gameActive) return;

    // Update the cell and board state
    boardState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'playerX' : 'playerO');

    // Check if the game is won or tied
    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
        statusDisplay.textContent = 'It\'s a Tie!';
        gameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check if the current player has won
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            boardState[a] === currentPlayer &&
            boardState[b] === currentPlayer &&
            boardState[c] === currentPlayer
        );
    });
}

// Reset the game
function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('playerX', 'playerO');
    });
}

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
