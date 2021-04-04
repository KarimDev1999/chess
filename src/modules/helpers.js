
export const getPieceName = (square) => {
    return square.getAttribute('piece').split('-')[1]
}

export const getPieceColor = (square) => {
    return square.getAttribute('piece').split('-')[0]
}

export const checkDir = (currentPiece) => {
    let dir;
    if (getPieceColor(currentPiece) === 'black') {
        dir = 1;
    }
    else {
        dir = -1
    }
    return dir
}


export const getEnemyColor = (piece) => {
    return piece.color === 'white' ? 'black' : 'white';
}



export const handlePinLine = (piece, searchMovesFunction, checkInfo) => {
    let lines = searchMovesFunction(piece.current);
    lines.forEach(moves => {
        if (moves.length > 0) {
            let numberOfPiecesOnTheLine = 0;
            let kingOnTheLine = null;
            let pieceOnTheLine = null;
            let isAllyPieceOnTheLine = false;
            moves.forEach(move => {
                if (move && move.classList.value.includes(`${getEnemyColor(piece)}-king`)) {
                    kingOnTheLine = move;
                }
                if (move && move !== piece.current && move.getAttribute('piece') && getPieceColor(move) !== piece.color && getPieceName(move) !== 'king') {
                    pieceOnTheLine = move;
                    numberOfPiecesOnTheLine++;
                }
                if (move && move !== piece.current && move.getAttribute('piece') && getPieceColor(move) === piece.color) {
                    isAllyPieceOnTheLine = true;
                }
            })
            if (kingOnTheLine && pieceOnTheLine && numberOfPiecesOnTheLine <= 1 && !isAllyPieceOnTheLine) {
                let isContainSameLine = checkInfo.pinLine.length && getPieceName(checkInfo.pinLine[0]) === getPieceName(piece.current)
                !isContainSameLine && checkInfo.pinLine.push(piece.current, ...moves.slice(0, moves.indexOf(kingOnTheLine)))
                checkInfo.pinedPiece = pieceOnTheLine

            }
        }
    })
}