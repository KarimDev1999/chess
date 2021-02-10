
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


