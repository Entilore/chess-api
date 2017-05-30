/**
 * Created by thareau on 28/05/17.
 */

import {Piece} from './Piece';
let instance;

export class Bishop extends Piece {
	constructor(isWhite) {
		if (instance) return instance;
		super(isWhite);

		this.pathes = {};
		instance = this;
	};

	isCellAccessible(xFrom, yFrom, xTo, yTo) {
		// cannot be on same line or column
		if (xFrom === xTo || yFrom === yTo) return false;

		// |slope| === 0.5
		// | (yFrom - yTo) / (xFrom - xTo) | === 0.5
		// |yFrom - yTo| / |xFrom - xTo| === 0.5
		// 2*|yFrom - yTo|  === |xFrom - xTo|

		return 2 * Math.abs(yFrom - yTo) === Math.abs(xFrom - xTo);
	}

	getAccessibleCells(x, y) {
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]];

		super.getAccessibleCells(x, y);
		let cells = [];

		for (let f in [
			(i, j) => [i + 1, j + 1],
			(i, j) => [i + 1, j - 1],
			(i, j) => [i - 1, j + 1],
			(i, j) => [i - 1, j - 1]]
			) {
			for (let [i, j] of Piece._computeCells(x, y, f)) {
				if (i !== x && j !== y) cells.push([i, j]);
			}
		}

		this.pathes[[x, y]] = cells;
		return cells;
	}
}