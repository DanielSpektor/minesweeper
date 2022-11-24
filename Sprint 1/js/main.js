'use strict'

var gBoard
var gLevel = { 
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    gameIsOver: false
}


function initGame(level, mines) {
    gGame.gameIsOver = false
    gLevel.MINES = mines
    gLevel.SIZE = level
    gBoard = buildBoard()
    renderBoard()
}

function buildBoard() {
     const board = []
        for (var i = 0; i < gLevel.SIZE; i++) {
            var newLine = []
            for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {minesAroundCount: 0, isShown: false, isMine: false, isMarked:false }
            newLine.push(cell)
            }         
            board.push(newLine)
        }
        // console.log(gBoard)
        gBoard = board
        renderBoard(board)
        return board
}

function renderBoard(board) {
    const elBoard = document.querySelector('.board')
    // console.log(board);
    var strHTML = '<table>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell= renderImg(i,j)
            strHTML += `<td><div data-i=${i} data-j=${j} onclick="onCellClicked(this)" >${currCell}</div></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    elBoard.innerHTML = strHTML
    // console.log(gBoard)  
}

function randMinesPos() {
    var count = 0
    while (count < gLevel.MINES) {
        var i = getRandomInt(0, gLevel.SIZE-1)
        var j = getRandomInt(0, gLevel.SIZE-1)

        if (gBoard[i][j].isShown === false && gBoard[i][j].isMine === false) {
            gBoard[i][j].isMine = true 
            count++
        }
    }
    renderBoard(gBoard)
}

function randCell(i, j) {
  if(!gBoard[i][j].isShown) {
    gBoard[i][j].isShown = true
  }
}

function setMinesNegsCount(rowIdx, colIdx) {
    for(var i = 0; i < gBoard.length ; i++) {
        for(var j = 0 ; j < gBoard[0].length ; j++) {
            var rowIdx = i
            var colIdx = j
            var count = 0
            for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
                if (i < 0 || i > gBoard.length) continue
                for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                    if (i === rowIdx && j === colIdx) continue
                    if (i < 0 || j > gBoard[0].length) continue
                    if(gBoard[rowIdx][colIdx].isMine)count++
                }
            }
            gBoard[rowIdx][colIdx].minesAroundCount = count
        }
    }
}

function checkMinesNegs(){
    for(var i = 0; i < gBoard.length ; i++) {
        for(var j = 0 ; j < gBoard[i].length ; j++) {
            setMinesNegsCount(gBoard,i,j)
        }
    }
}

function onCellClicked(elCell) {
    if (gGame.gameIsOver === true) return
    var i = elCell.dataset.i
    var j = elCell.dataset.j
    
    // console.log(elCell.dataset.i);
    if(!gGame.isOn) {
        gGame.isOn = true
        gBoard[i][j].isShown = true
        randMinesPos()
        checkMinesNegs()
        setMinesNegsCount()
    }
    if(!gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true
        renderImg(i, j)
    }else{
        expandShown(i, j)
        renderImg(i, j)
        gBoard[i][j].isShown = true
        console.log('game over')
        //gameover function
        checkGameOver()
    }
    renderBoard(gBoard)
    // console.log(gBoard);
}

function openCell(cellI,cellJ) {
for (var i = cellI - 1; i <= cellJ + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
        }
    }
}

function renderImg (i, j) {
    var cell = gBoard[i][j]
    
    // console.log(cell);
    if (!cell.isShown) return `<img class="cellImg" src="./pics/notEmpty.png"/>`
    if(cell.minesAroundCount === 1) return `<img class="cellImg" src="./pics/1.png"/>`
    if (cell.isMine) return `<img class="cellImg" src="./pics/boom.jpg"/>`
    switch (cell.minesAroundCount) {
        case 0:
            return `<img class="cellImg" src="./pics/empty.png"/>`
            break;
        case 1:
            return `<img class="cellImg" src="./pics/1.png"/>` 
            break;
        case 2:
            return `<img class="cellImg" src="./pics/2.jpg"/>`
            break;
        case 3:
            return `<img class="cellImg" src="./pics/3.jpg"/>`
            break;
        case 4:
            return `<img class="cellImg" src="./pics/4.jpg"/>`
            break;
                     
    }
}
                    
function checkGameOver() {
    gGame.gameIsOver = true
    initGame()          
                        
}
                        
function expandShown(i, j) { 
    var idxI = i
    var idxJ = j
    for (var idxI = i -1; idxI <= i + 1; idxI++) {
        if(idxI < 0 || idxI >= gBoard.length) continue
        for (var idxJ = j - 1; idxJ <= j + 1; idxJ++) {
            if (idxJ < 0 || idxJ >= gBoard[0].length) continue
            if (gBoard[i] === idxI || gBoard[j] === idxJ) continue
            if (gBoard[i][j].isMine) continue
            gBoard[i][j].isShown = true
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
                            