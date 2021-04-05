import { PieceFactory } from './modules/factory';
import { searchNextMoves } from './modules/searchMoves'
import { checkDir, getPieceColor, getPieceName, getEnemyColor, handlePinLine, handleStalemate } from './modules/helpers'
import { searchNextMovesForBishop, searchNextMovesForRook } from './modules/searchMoves';
let board = document.querySelector('.board');

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let square = document.createElement('div');

        square.classList.add('square');
        board.appendChild(square);
    }
}

let y = 8;
let x = 1;

let squares = document.querySelectorAll('.square')

let checker = false;

for (let i = 0; i < squares.length; i++) {
    if (x > 8) {
        y--
        x = 1
        checker = !checker
    }
    squares[i].setAttribute('posY', y)
    squares[i].setAttribute('posX', x)
    if (checker === false) {
        squares[i].style.backgroundColor = '#f1f1f1'
        checker = !checker
    }
    else {
        squares[i].style.backgroundColor = '#85aa53'
        checker = !checker
    }
    x++
}



// draw pieces login starts here
let factory = new PieceFactory();
const blackPieces = [
    factory.create('pawn', 'black'),
    factory.create('rook', 'black'),
    factory.create('horse', 'black'),
    factory.create('bishop', 'black'),
    factory.create('queen', 'black'),
    factory.create('king', 'black')
]

const drawPieces = (pieces) => {
    let color = pieces[0].color;
    pieces.forEach(piece => {
        piece.startPos.forEach(pos => {
            let node = document.querySelector(`[posX="${pos.x}"][posY="${pos.y}"]`);
            node.setAttribute('piece', `${color}-${piece.name}`);
            node.classList.add(`${color}-${piece.name}`);
            if (piece.name === 'pawn') {
                node.setAttribute('firstMove', true)
            }
            if (piece.name === 'king') {
                node.setAttribute('is-checked', 0)
            }
        })
    })
}

function addPiecesForBlack(blackPieces) {
    drawPieces(blackPieces)
}
addPiecesForBlack(blackPieces);

const whitePieces = [
    factory.create('pawn', 'white'),
    factory.create('rook', 'white'),
    factory.create('horse', 'white'),
    factory.create('bishop', 'white'),
    factory.create('queen', 'white'),
    factory.create('king', 'white'),
]


function addPiecesForWhite(whitePieces) {
    drawPieces(whitePieces)
}
addPiecesForWhite(whitePieces)

// draw pieces logic ends here

const checkInfo = {
    checkLines: [],
    saveMoves: [],
    pinLine: [],
    pinedPiece: null,
    isCheckmate: false,
    isStalemate: false,
    kingInCheck: null,

}
let currentTurnText = document.querySelector('.current-turn');
let history = [];
let CURRENT_TURN = 'white';
currentTurnText.innerHTML = `CURRENT TURN: ${CURRENT_TURN}`;

const movePiece = (history) => {
    let prev = history[0];
    let next = history[1];
    let color = getPieceColor(prev)
    next.classList.remove(next.getAttribute('piece'));
    next.removeAttribute('piece');
    if (prev.getAttribute('firstMove' !== null)) {
        prev.removeAttribute('firstMove')
    }
    if (getPieceName(prev) === 'pawn' && (+next.getAttribute('posY') === 1 || +next.getAttribute('posY') === 8)) {
        next.classList.add(`${color}-queen`)
        next.setAttribute('piece', `${color}-queen`)
    }
    else {
        next.classList.add(prev.getAttribute('piece'))
        next.setAttribute('piece', prev.getAttribute('piece'))
    }
    prev.classList.remove(prev.getAttribute('piece'), 'current')
    prev.removeAttribute('piece')

}

const filterMoves = (piece) => {
    let checkedList = [];
    let enemyColor = getEnemyColor(piece);

    //diagonal pins
    if (getPieceName(piece.current) === 'bishop' || getPieceName(piece.current) === 'queen') {
        handlePinLine(piece, searchNextMovesForBishop, checkInfo)
    }
    // vertical and horizontal pins
    if (getPieceName(piece.current) === 'rook' || getPieceName(piece.current) === 'queen') {
        handlePinLine(piece, searchNextMovesForRook, checkInfo)
    }

    piece.nextMoves.flat().forEach(move => {
        if (move) {
            if (getPieceName(piece.current) === 'king' && !move.getAttribute(`${enemyColor}-attack`) && (move.getAttribute('piece') !== null && getPieceColor(move) !== piece.color || move.getAttribute('piece') === null)) {
                return checkedList.push(move)
            }
            if (move.getAttribute('piece') !== null && getPieceName(move) === 'king' && getPieceColor(move) !== piece.color) {
                piece.nextMoves.forEach(moves => {
                    if (moves.length > 0) {
                        moves.forEach(move => {
                            if (move && move.classList.value.includes(`${enemyColor}-king`)) {
                                let isContainSameLine = checkInfo.checkLines.some(line => getPieceName(line[0]) === getPieceName(piece.current))
                                !isContainSameLine && checkInfo.checkLines.push([piece.current, ...moves.slice(0, moves.indexOf(move) + 1)]);
                                checkInfo.kingInCheck = enemyColor;
                            }
                        })
                    }
                })
                move.setAttribute('is-checked', 1),
                    move.classList.add('red')
                return

            }
            if (move.getAttribute('piece') === null && getPieceName(piece.current) !== 'king') {
                return checkedList.push(move);
            }
            if (move.getAttribute('piece') !== null && getPieceColor(move) !== piece.color && getPieceName(move) !== 'king' && getPieceName(piece.current) !== 'king') {
                return checkedList.push(move);
            }
        }
    })


    if (checkInfo.checkLines.length === 1 && checkInfo.kingInCheck) {
        checkedList.forEach(move => {
            checkInfo.checkLines.forEach(line => {
                line.forEach(square => {
                    if (piece.color === checkInfo.kingInCheck && square === move && getPieceName(piece.current) !== 'king') {
                        checkInfo.saveMoves.push(move);
                    }
                    else if (piece.color === checkInfo.kingInCheck && getPieceName(piece.current) === 'king') {
                        checkInfo.saveMoves.push(move)
                    }
                })
            })
        })
        return checkInfo.saveMoves;
    }
    else if (checkInfo.checkLines.length === 2 && checkInfo.kingInCheck) {
        checkedList.forEach(move => {
            if (getPieceName(piece.current) === 'king' && piece.color === checkInfo.kingInCheck) {
                checkInfo.saveMoves.push(move);
            }
        })
        return checkInfo.saveMoves
    }
    if (checkInfo.pinedPiece === piece.current) {
        checkedList = []
        piece.nextMoves.flat().forEach(move => {
            checkInfo.pinLine.forEach(pinedSquare => {
                if (pinedSquare === move) {
                    checkedList.push(move)
                }
            })
        })
        return checkedList
    }

    return checkedList;
}


const checkForDiagonalAttacks = (piece, color) => {
    let currentPiece = piece.current;
    let dir = checkDir(currentPiece);
    let enemyColor = getEnemyColor(piece);
    let diagonalAttacks = [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`)]
    diagonalAttacks.forEach(attack => {
        if (attack) {
            attack.setAttribute(`${color}-attack`, true)
            if (attack.getAttribute('piece') && getPieceName(attack) === 'king' && getPieceColor(attack) !== color) {
                attack.setAttribute('is-checked', 1);
                attack.classList.add('red');
                checkInfo.kingInCheck = enemyColor;
                let test = checkInfo.checkLines.some(line => getPieceName(line[line.length - 1]) === getPieceName(piece.current))
                !test && checkInfo.checkLines.push([piece.current]);
            }
        }
    })
    piece.nextMoves = diagonalAttacks.filter(attack => attack && attack.getAttribute('piece') !== null && getPieceColor(attack) !== color && getPieceName(attack) !== 'king');
    return piece;
}


const movesForAllPieces = (squares) => {
    let allPieces = [];
    squares.forEach(square => square.getAttribute('piece') !== null ? (
        allPieces.push({
            current: square,
            nextMoves: searchNextMoves(square),
            color: getPieceColor(square)
        })
    ) : null)
    allPieces.forEach(piece => getPieceName(piece.current) !== 'pawn' && piece.nextMoves.flat().forEach(move => move && move.setAttribute(`${piece.color}-attack`, true)))
    let restarted = false;
    for (let i = 0; i < allPieces.length; i++) {
        if (!restarted && checkInfo.kingInCheck) {
            i = 0;
            restarted = true
        }
        checkInfo.saveMoves = [];
        let piece = allPieces[i];
        if (piece && getPieceName(piece.current) === 'pawn') {
            piece.nextMoves = [...filterMoves(piece), ...filterMoves(checkForDiagonalAttacks(piece, piece.color))]
        }
        else {
            let filtredMoves = filterMoves(piece);
            piece.nextMoves = filtredMoves
        }
    }
    !allPieces.find(piece => piece.nextMoves.length) ? checkInfo.isCheckmate = true : null;
    handleStalemate(allPieces, checkInfo, CURRENT_TURN, 'black');
    handleStalemate(allPieces, checkInfo, CURRENT_TURN, 'white');
    if (checkInfo.isStalemate) return setTimeout(() => alert('stalemate sorry'))
    if (checkInfo.isCheckmate) return setTimeout(() => alert('checkmate sorry'))
    return allPieces;
}


const triggerPiece = (e, squares) => {
    let possibleMoves = [];
    let currentPiece = e.target;
    currentPiece !== null && currentPiece.getAttribute('piece') ? currentPiece.classList.add('current') : null;
    if (history.length < 2) {
        history.push(currentPiece);
    }
    if (history.length === 2) {
        if (history[1].classList.contains('next')) {
            movePiece(history)
            CURRENT_TURN = CURRENT_TURN === 'white' ? 'black' : 'white';
            currentTurnText.innerHTML = `CURRENT TURN: ${CURRENT_TURN}`;
        }
        history = [];
        currentPiece = null;
        checkInfo.checkLines = [];
        checkInfo.pinLine = [];
        checkInfo.pinedPiece = null;
        checkInfo.kingInCheck = null;
        squares.forEach(square => {
            square.removeAttribute('white-attack')
            square.removeAttribute('black-attack')
            square.removeAttribute('is-checked')
            square.classList.remove('red', 'next', 'current')
        })
    }
    let allMoves = movesForAllPieces(squares)
    allMoves.length > 0 && allMoves.forEach(square => {
        if (square.current === currentPiece) {
            possibleMoves.push(...square.nextMoves);
        }
    })
    possibleMoves.forEach(move => {
        move !== null && getPieceColor(currentPiece) === CURRENT_TURN ? move.classList.add('next') : null
    })
}


squares.forEach(square => {
    square.addEventListener('click', (e) => {
        triggerPiece(e, squares)
    })
});

