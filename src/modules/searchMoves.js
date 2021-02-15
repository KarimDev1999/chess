import { checkDir, getPieceName } from "./helpers";

const searchNextMovesForBishop = (currentPiece) => {
    let lines = new Array(4).fill(null);
    let toggle = false;
    let moves = lines.map((_, i) => {
        let asd = [];
        if (i % 2 === 0) {
            toggle = !toggle;
        }
        for (let j = 1; j <= 7; j++) {
            if (i % 2 === 0 && !toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - j}"][posX="${+currentPiece.getAttribute('posX') - j}"]`))
            }
            else if (i % 2 !== 0 && !toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + j}"][posX="${+currentPiece.getAttribute('posX') + j}"]`))
            }
            else if (i % 2 === 0 && toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + j}"][posX="${+currentPiece.getAttribute('posX') - j}"]`))
            }
            else if (i % 2 !== 0 && toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - j}"][posX="${+currentPiece.getAttribute('posX') + j}"]`))
            }
        }
        return asd
    })
    moves.forEach(line => line.forEach((move, i) => move && move.getAttribute('piece') !== null ? line.splice(i + 1) : null))
    return moves;
}


const searchNextMovesForRook = (currentPiece) => {
    let lines = new Array(4).fill(null);
    let toggle = false;
    let moves = lines.map((_, i) => {
        let asd = [];
        if (i % 2 === 0) {
            toggle = !toggle;
        }

        for (let j = 1; j <= 7; j++) {
            if (i % 2 === 0 && !toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') - j}"]`))
            }
            else if (i % 2 !== 0 && !toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') + j}"]`))
            }
            else if (i % 2 === 0 && toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + j}"][posX="${+currentPiece.getAttribute('posX')}"]`))
            }
            else if (i % 2 !== 0 && toggle) {
                asd.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - j}"][posX="${+currentPiece.getAttribute('posX')}"]`))
            }
        }

        return asd
    })
    moves.forEach(line => line.forEach((move, i) => move && move.getAttribute('piece') !== null ? line.splice(i + 1) : null))
    return moves
}

const searchNextMovesForHorse = (currentPiece) => {
    return [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 2}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 2}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') + 2}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') - 2}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') - 2}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') + 2}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 2}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`),
    document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 2}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`),
    ]
}

const searchNextMovesForKing = (currentPiece) => {
    return [
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`),
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX')}"]`),
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY') + 1}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`),
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`),
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY')}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`),
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') + 1}"]`),
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX')}"]`),
        document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - 1}"][posX="${+currentPiece.getAttribute('posX') - 1}"]`),
    ]
}

const searchNextMovesForQueen = (currentPiece) => {
    return [...searchNextMovesForRook(currentPiece), ...searchNextMovesForBishop(currentPiece)];
}



const searchNextMovesForPawn = (currentPiece) => {
    let dir = checkDir(currentPiece)
    let nextMoves = [document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir}"][posX="${currentPiece.getAttribute('posX')}"]`)];
    if (currentPiece.getAttribute('firstMove') !== null) {
        nextMoves.push(document.querySelector(`[posY="${+currentPiece.getAttribute('posY') - dir * 2}"][posX="${currentPiece.getAttribute('posX')}"]`));

    }
    nextMoves.forEach((move, i) => move && move.getAttribute('piece') !== null ? nextMoves.splice(i) : null)
    return nextMoves;

}


const searchNextMoves = (currentPiece) => {
    switch (getPieceName(currentPiece)) {
        case 'rook': {
            return searchNextMovesForRook(currentPiece)
        }
        case 'bishop': {
            return searchNextMovesForBishop(currentPiece)
        }
        case 'horse': {
            return searchNextMovesForHorse(currentPiece)
        }
        case 'pawn': {
            return searchNextMovesForPawn(currentPiece)
        }
        case 'queen': {
            return searchNextMovesForQueen(currentPiece)
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