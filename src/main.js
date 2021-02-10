import { PieceFactory } from './modules/factory';
import { searchNextMoves } from './modules/searchMoves'
import { checkDir, getPieceColor, getPieceName } from './modules/helpers'
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




let factory = new PieceFactory();
let blackPawn = factory.create('pawn', 'black');
let blackRook = factory.create('rook', 'black');
let blackHorse = factory.create('horse', 'black');
let blackBishop = factory.create('bishop', 'black');
let blackQueen = factory.create('queen', 'black');
let blackKing = factory.create('king', 'black');

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

function addPiecesForBlack(...args) {
    drawPieces(args)
}
addPiecesForBlack(blackPawn, blackRook, blackHorse, blackBishop, blackQueen, blackKing);


let whitePawn = factory.create('pawn', 'white');
let whiteRook = factory.create('rook', 'white');
let whiteHorse = factory.create('horse', 'white');
let whiteBishop = factory.create('bishop', 'white');
let whiteQueen = factory.create('queen', 'white');
let whiteKing = factory.create('king', 'white');

function addPiecesForWhite(...args) {
    drawPieces(args)
}
addPiecesForWhite(whitePawn, whiteRook, whiteHorse, whiteBishop, whiteQueen, whiteKing)

const movePiece = (history) => {
    let prev = history[0];
    let next = history[1];
    let color = getPieceColor(history[0])
    next.classList.remove(next.getAttribute('piece'));
    next.removeAttribute('piece');
    if (history[0].getAttribute('firstMove' !== null)) {
        history[0].removeAttribute('firstMove')
    }
    if (getPieceName(history[0]) === 'pawn' && (+history[1].getAttribute('posY') === 1 || +history[1].getAttribute('posY') === 8)) {
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
    let enemyColor = piece.color === 'white' ? 'black' : 'white';
    piece.nextMoves.flat().forEach(move => {
        if (move) {
            if (getPieceName(piece.current) === 'king' && !move.getAttribute(`${enemyColor}-attack`)) {
                if (move.getAttribute('piece') !== null && getPieceColor(move) !== piece.color || move.getAttribute('piece') === null) {
                    return checkedList.push(move)
                }
            }
            if (move.getAttribute('piece') !== null && getPieceName(move) === 'king' && getPieceColor(move) !== piece.color) {
                return (
                    move.setAttribute('is-checked', 1),
                    move.classList.add('red')
                )
            }

            if (move.getAttribute('piece') === null && getPieceName(piece.current) !== 'king') {
                return checkedList.push(move);
            }
            if (move.getAttribute('piece') !== null && getPieceColor(move) !== piece.color && getPieceName(move) !== 'king') {
                return checkedList.push(move);
            }
        }
    })
    return checkedList
}




let currentTurnText = document.querySelector('.current-turn');
let history = [];
let CURRENT_TURN = 'white';
currentTurnText.innerHTML = `CURRENT TURN: ${CURRENT_TURN}`;



const checkForDiagonalAttacks = (currentPiece, color) => {
    let dir = checkDir(currentPiece)
    let diagonalAttacks = [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`)]
    diagonalAttacks.forEach(attack => attack && attack.setAttribute(`${color}-attack`, true))
    return diagonalAttacks.filter(attack => attack && attack.getAttribute('piece') !== null && getPieceColor(attack) !== color)
}


const movesForAllPieces = (squares) => {
    let allPieces = [];
    squares.forEach(square => square.getAttribute('piece') !== null ? (
        allPieces.push({
            current: square,
            nextMoves: searchNextMoves(getPieceName(square), square),
            color: getPieceColor(square)
        })
    ) : null)
    return allPieces.map(piece => {
        if (piece && getPieceName(piece.current) === 'pawn') {
            return {
                ...piece,
                nextMoves: [...piece.nextMoves, ...checkForDiagonalAttacks(piece.current, piece.color)]
            }
        }
        let filtredMoves = filterMoves(piece);
        piece.nextMoves.flat().forEach(move => move && move.setAttribute(`${piece.color}-attack`, true))
        return {
            ...piece, nextMoves: filtredMoves
        }
    })
}

const triggerPiece = (e, squares) => {
    let possibleMoves = [];
    let currentPiece = e.target;

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
        squares.forEach(square => {
            square.removeAttribute('white-attack')
            square.removeAttribute('black-attack')
            square.removeAttribute('is-checked')
            square.classList.remove('red')

        })
    }
    squares.forEach(square => {
        square.classList.remove('next', 'current')
    })
    currentPiece !== null && currentPiece.getAttribute('piece') ? currentPiece.classList.add('current') : null;
    movesForAllPieces(squares).forEach(square => {
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
