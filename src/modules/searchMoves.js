import { checkDir, getPieceColor, getPieceName } from "./helpers";


const cutToStopPosition = (moves, currentPiece) => {
    moves.forEach(line => line.forEach((move, i) => (move && move.getAttribute('piece') && getPieceName(move) !== 'king') || (move && move.getAttribute('piece') && getPieceName(move) && getPieceName(move) === 'king' && getPieceColor(currentPiece) === getPieceColor(move)) ? line.splice(i + 1) : null))
    return moves;
}

export const searchNextMovesForBishop = (currentPiece) => {
    let lines = new Array(4).fill(null);
    let toggle = false;
    let moves = lines.map((_, i) => {
        let tmp = [];
        if (i % 2 === 0) {
            toggle = !toggle;
        }
        for (let j = 1; j <= 7; j++) {
            if (i % 2 === 0 && !toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - j}"][posX="${+currentPiece.getAttribute('posX') - j}"]`))
            }
            else if (i % 2 !== 0 && !toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + j}"][posX="${+currentPiece.getAttribute('posX') + j}"]`))
            }
            else if (i % 2 === 0 && toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + j}"][posX="${+currentPiece.getAttribute('posX') - j}"]`))
            }
            else if (i % 2 !== 0 && toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - j}"][posX="${+currentPiece.getAttribute('posX') + j}"]`))
            }
        }
        return tmp
    })
    return moves;
}


export const searchNextMovesForRook = (currentPiece) => {
    let lines = new Array(4).fill(null);
    let toggle = false;
    let moves = lines.map((_, i) => {
        let tmp = [];
        if (i % 2 === 0) {
            toggle = !toggle;
        }
        for (let j = 1; j <= 7; j++) {
            if (i % 2 === 0 && !toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') - j}"]`))
            }
            else if (i % 2 !== 0 && !toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') + j}"]`))
            }
            else if (i % 2 === 0 && toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + j}"][posX="${+currentPiece.getAttribute('posX')}"]`))
            }
            else if (i % 2 !== 0 && toggle) {
                tmp.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - j}"][posX="${+currentPiece.getAttribute('posX')}"]`))
            }
        }
        return tmp
    })
    return moves
}

const searchNextMovesForHorse = (currentPiece) => {
    return [
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 2}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 2}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') + 2}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') - 2}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') - 2}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') + 2}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 2}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 2}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`)],
    ]
}

const searchNextMovesForKing = (currentPiece) => {
    return [
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX')}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX')}"]`)],
        [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`)],
    ]
}

const searchNextMovesForQueen = (currentPiece) => {
    return [...searchNextMovesForRook(currentPiece), ...searchNextMovesForBishop(currentPiece)];
}



const searchNextMovesForPawn = (currentPiece) => {
    let dir = checkDir(currentPiece)
    let nextMoves = [[document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir}"][posX="${currentPiece.getAttribute('posX')}"]`)]];
    if (currentPiece.getAttribute('firstMove') !== null) {
        nextMoves.push([document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir * 2}"][posX="${currentPiece.getAttribute('posX')}"]`)]);

    }
    nextMoves.flat().forEach((move, i) => move && move.getAttribute('piece') !== null ? nextMoves.splice(i) : null)
    return nextMoves;
}


const searchNextMoves = (currentPiece) => {
    switch (getPieceName(currentPiece)) {
        case 'rook': {
            return cutToStopPosition(searchNextMovesForRook(currentPiece), currentPiece)
        }
        case 'bishop': {
            return cutToStopPosition(searchNextMovesForBishop(currentPiece), currentPiece)
        }
        case 'horse': {
            return searchNextMovesForHorse(currentPiece)
        }
        case 'pawn': {
            return searchNextMovesForPawn(currentPiece)
        }
        case 'queen': {
            return cutToStopPosition(searchNextMovesForQueen(currentPiece), currentPiece)
        }
        case 'king': {
            return searchNextMovesForKing(currentPiece)
        }
        default: {
            break
        }
    }
}


export { searchNextMoves }