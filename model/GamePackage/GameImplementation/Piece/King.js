/**
 * Created by thareau on 28/05/17.
 */

import {isInMap} from '../../../../util/general';
import {adjacentDistance} from '../../../../util/map';
import {Piece} from './Piece';
import {Game} from '../Game';
let instance;

export class King extends Piece {
	constructor(isWhite) {
		super(isWhite);
		this.pathes = {};
	}

	isCellAccessible(xFrom, yFrom, xTo, yTo, game) {
		super.isCellAccessible(xFrom, yFrom, xTo, yTo, game);
		if (adjacentDistance(xFrom, yFrom, xTo, yTo) === 1) return true;


		if (this.isInitialCell(xFrom, yFrom) && yTo === this._figureLine) {
			// queen side castling
			let side = -1;
			if (xTo === 2) {
				side = Game.QUEEN_SIDE_CASTLING;
			}
			if (xTo === 6) {
				// king side castling
				side = Game.KING_SIDE_CASTLING;
			}

			if (side !== -1) {
				return game.isCastlingPossible(this.isWhite, side);
			}
		}

		return false;
	}

	static * _computeCells(n) {
		for (let i of [-1, 0, 1]) {
			let v = i + n;
			if (isInMap(v)) yield v;
		}
	}

	* getInitialPosition() {

		yield [4, this._figureLine];
	}

	getAccessibleCells(x, y) {
		// speed-optimization, may be deleted if more space needed
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]];

		super.getAccessibleCells(x, y);
		let cells = [];

		for (const i of King._computeCells(x)) {
			for (const j of King._computeCells(y)) {
				// push if not original cell
				if (i !== x && j !== y) {
					cells.push([i, j]);
				}
			}
		}

		this.pathes[[x, y]] = cells;
		return cells;
	}

	isInitialCell(x, y) {
		let [initialX, initialY] = this.getInitialPosition().next().value;
		return x === initialX && y === initialY
	}
}