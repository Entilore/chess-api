/**
 * Created by thareau on 28/05/17.
 */

import {isInMap} from '../../../util/general';
import {adjacentDistance} from '../../../util/map';
import {Piece} from './Piece';
let instance;

export class King extends Piece {
	constructor(isWhite) {
		if (instance) return instance;
		super(isWhite);

		this.pathes = {};
		instance = this;
	};

	isCellAccessible(xFrom, yFrom, xTo, yTo) {
		// cell is accessible if 'to' is adjacent
		return adjacentDistance(xFrom, yFrom, xTo, yTo) === 1;
	}

	static _computeCells(n) {
		for (let i of [-1, 0, 1]) {
			let v = i + n;
			if (isInMap(v)) yield v;
		}
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
}