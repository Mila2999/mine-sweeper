'use strict';

let gBoard = [];
const gLevel = { SIZE: 4, MINES: 2 };
const gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
function onInit() {
  buildBoard();
}

function buildBoard() {
  gBoard = createMatrix(gLevel.SIZE);

  let minesSet = 0;
  while (minesSet < gLevel.MINES) {
    let i = getRandomInt(0, gLevel.SIZE);
    let j = getRandomInt(0, gLevel.SIZE);
    if (!gBoard[i][j].isMine) {
      gBoard[i][j].isMine = true;
      minesSet++;
    }
  }

  renderBoard();
}

function renderBoard() {
  let strHTML = '<table>';
  setMinesNegsCount(gBoard);
  for (let i = 0; i < gBoard.length; i++) {
    strHTML += '<tr>';
    for (let j = 0; j < gBoard[i].length; j++) {
      let currCell = gBoard[i][j];
      let className = '';
      if (currCell.isShown) className += ' shown';
      if (currCell.isMarked) className += ' marked';
      strHTML += `<td class="cell ${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j}); return false;">`;
      if (currCell.isShown && currCell.isMine) strHTML += '💣';
      else if (currCell.isShown) strHTML += currCell.minesAroundCount;
      else if (currCell.isMarked) strHTML += '🚩';
      strHTML += '</td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</table>';

  let elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}

function createMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };
    }
  }
  console.log(matrix);
  return matrix;
}

function setMinesNegsCount(board) {
  for (let i = 0; i < gLevel.SIZE; i++) {
    for (let j = 0; j < gLevel.SIZE; j++) {
      let cell = board[i][j];
      if (!cell.isMine) {
        cell.minesAroundCount = countMinesAround(board, i, j);
      }
    }
  }
}

function countMinesAround(board, i, j) {
  let minesCount = 0;
  for (let iDelta = -1; iDelta <= 1; iDelta++) {
    for (let jDelta = -1; jDelta <= 1; jDelta++) {
      let iNew = i + iDelta;
      let jNew = j + jDelta;
      if (iNew >= 0 && iNew < gLevel.SIZE && jNew >= 0 && jNew < gLevel.SIZE) {
        if (board[iNew][jNew].isMine) {
          minesCount++;
        }
      }
    }
  }
  return minesCount;
}

function cellClicked(element, i, j) {
  console.log(element);
  console.log(i);
  console.log(j);
  console.log(gBoard);
  console.log(gBoard[i][j]);
  gBoard[i][j].isShown = true;
  renderBoard();
}
