const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        isGameActive = false;
    } else if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
    }
};

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (board[clickedIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWinner();

    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = '');
    isGameActive = true;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

statusText.textContent = `${currentPlayer}'s Turn`;
