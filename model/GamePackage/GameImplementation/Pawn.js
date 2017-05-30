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

	_beginingLine() {
		if (this.isWhite) return 1
		return 6;
	}


	isCellAccessible(xFrom, yFrom, xTo, yTo) {
		if (xFrom !== xTo) return false;
		if (yFrom === this._beginingLine() && this._moveForward(yFrom, 2) === yTo) return true;
		return yTo === this._moveForward(yFrom);
	}

	getAccessibleCells(x, y) {
		// a queen is a rook and a bishop...
		let ret = []
		let nextY = this._moveForward(y);
		if (isInMap(nextY)) ret.push([x, nextY]);

		if (y === this._beginingLine()) ret.push([x, this._moveForward(y, 2)]);

		return ret;
	}
}