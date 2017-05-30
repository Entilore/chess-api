/**
 * Created by thareau on 28/05/17.
 */

import {Piece} from './Piece';
let instance;

export class Rook extends Piece {
	constructor(isWhite) {
		if (instance) return instance;
		super(isWhite);

		this.pathes = {};
		instance = this;
	};

	isCellAccessible(xFrom, yFrom, xTo, yTo){
		// either same column, either same line, but not both
		return (xFrom === xTo) !== (yFrom === yTo);
	}

	getAccessibleCells(x, y) {
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]];

		super.getAccessibleCells(x, y);
		let cells = [];

		for (let f in [
			(i, j) => [i + 1, j],
			(i, j) => [i - 1, j],
			(i, j) => [i, j + 1],
			(i, j) => [i, j - 1]]
			) {
			for (let [i, j] of Piece._computeCells(x, y, f)) {
				if (i !== x && j !== y) cells.push([i, j]);
			}
		}

		this.pathes[[x, y]] = cells;
		return cells;
	}
}