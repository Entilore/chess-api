/**
 * Created by thareau on 28/05/17.
 */
import {isInMap} from '../../../util/general';
import {Piece} from './Piece';
let whiteInstance;
let blackInstance;

export class Pawn extends Piece {
	constructor(isWhite) {
		super(isWhite);

		this.isWhite = isWhite;
	}

	_moveForward(n, times = 1) {
		if (this.isWhite) return n + times;
		return n - times;
	}

	_beginningLine() {
		if (this.isWhite) return 1;
		return 6;
	}


	isCellAccessible(xFrom, yFrom, xTo, yTo, game) {
		let toContent = game.getContent(xTo, yTo);
		// if TO is occupied by a piece of the same color, abort
		if (toContent && toContent.isWhite === this.isWhite) {
			return false;
		}
		else {
			// either empty, either adversary on it
			if (toContent) {
				// adversary on it
				// piece have to be on +- 1 line
				if (xFrom !== xTo - 1 && xFrom !== xTo + 1) return false;
				// piece have to be on the next line
				return yTo === this._moveForward(yFrom);

			} else {
				// empty
				// piece have to stay on the same column
				if (xFrom !== xTo) return false;
				// piece may advance with 2 if on the beginning line
				if (yFrom === this._beginningLine() && this._moveForward(yFrom, 2) === yTo) return true;
				// otherwise shall go to the next line
				return yTo === this._moveForward(yFrom);
			}
		}
	}

	getAccessibleCells(x, y) {
		// a queen is a rook and a bishop...
		let ret = [];
		let nextY = this._moveForward(y);
		if (isInMap(nextY)) ret.push([x, nextY]);

		if (y === this._beginningLine()) ret.push([x, this._moveForward(y, 2)]);

		return ret;
	}
}