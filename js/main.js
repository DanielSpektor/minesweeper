'use strict'

const BOMB = '💣'
var gBoard

var gLevel = { 
    SIZE: 4,
    MINES: 2
}
var gGame = {
    minesAroundCount: 4, 
    isShown: false, 
    isMine: false, 
    isMarked: true
}


function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)

}

function buildBoard() {
     const gBoard = []
        for (var i = 0; i < gLevel.SIZE; i++) {
            var newLine = []
            for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {minesAroundCount: 4, isShown: false, isMine: false, isMarked: true}
            newLine.push(cell)
            }         
            gBoard.push(newLine)
        }
        // console.log(gBoard)
    renderBoard(gBoard)
}

function renderBoard(board) {
    const elBoard = document.querySelector('.board')
    var strHTML = '<table>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = ''
            strHTML += `<td><div data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${currCell}</div></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    elBoard.innerHTML += strHTML
    // console.log(gBoard)
}


// function setMinesNegsCount(board) {


// }

// function cellClicked() {


// }
// function cellMarked() {


// }

// function checkGameOver() {


// }

// function expandShown() {


// }

// function getRandomIntInclusive(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min
// }