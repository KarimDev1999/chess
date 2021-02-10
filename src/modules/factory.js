class Pawn {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.startPos = color === 'black' ? [{ y: 7, x: 1 }, { y: 7, x: 2 }, { y: 7, x: 3 }, { y: 7, x: 4 }, { y: 7, x: 5 }, { y: 7, x: 6 }, { y: 7, x: 7 }, { y: 7, x: 8 }] : [{ y: 2, x: 1 }, { y: 2, x: 2 }, { y: 2, x: 3 }, { y: 2, x: 4 }, { y: 2, x: 5 }, { y: 2, x: 6 }, { y: 2, x: 7 }, { y: 2, x: 8 }]
    }
}
class Rook {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.startPos = color === 'black' ? [{ y: 8, x: 1 }, { y: 8, x: 8 }] : [{ y: 1, x: 1 }, { y: 1, x: 8 }]
    }
}
class Horse {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.startPos = color === 'black' ? [{ y: 8, x: 2 }, { y: 8, x: 7 }] : [{ y: 1, x: 2 }, { y: 1, x: 7 }]
    }
}
class Bishop {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.startPos = color === 'black' ? [{ y: 8, x: 3 }, { y: 8, x: 6 }] : [{ y: 1, x: 3 }, { y: 1, x: 6 }]
    }
}
class Queen {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.startPos = color === 'black' ? [{ y: 8, x: 4 }] : [{ y: 1, x: 4 }]
    }
}
class King {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.startPos = color === 'black' ? [{ y: 8, x: 5 }] : [{ y: 1, x: 5 }]
    }
}

export class PieceFactory {
    create(name, color) {
        switch (name) {
            case 'pawn':
                return new Pawn(name, color);
            case 'rook':
                return new Rook(name, color);
            case 'horse':
                return new Horse(name, color);
            case 'bishop':
                return new Bishop(name, color);
            case 'queen':
                return new Queen(name, color);
            case 'king':
                return new King(name, color);
        }
    }
}

