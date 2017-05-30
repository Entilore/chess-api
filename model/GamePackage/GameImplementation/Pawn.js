/**
 * Created by thareau on 28/05/17.
 */
import {isInMap} from '../../../util/general';
import {Piece} from './Piece';
let whiteInstance;
let blackInstance;

export class Pawn extends Piece {
	constructor(isWhite) {
		if (isWhite && whiteInstance) return whiteInstance;
		if (!isWhite && blackInstance) return blackInstance;
		super(isWhite);

		this.isWhite = isWhite;

		if (isWhite)
			whiteInstance = this;
		else
			blackInstance = this;
	};

	isCellAccessible(xFrom, yFrom, xTo, yTo) {
		if (this.isWhite)
			return yTo === yFrom + 1;
		return yTo === yFrom - 1;
	}

	getAccessibleCells(x, y) {
		// a queen is a rook and a bishop...
		let nextY = y - 1;
		if (this.isWhite) nextY = y + 1;
		if (isInMap(nextY)) return [[x, nextY]];
		return [];
	}
}