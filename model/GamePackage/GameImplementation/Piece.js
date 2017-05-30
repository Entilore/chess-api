/**
 * Created by thareau on 28/05/17.
 */

import {isInMap} from '../../../util/general';
import {IPiece} from '../IPiece';
export class Piece extends IPiece {
	constructor(isWhite) {super(isWhite);};


	isCellAccessible(xFrom, yFrom, xTo, yTo) {
		super.isCellAccessible(xFrom, yFrom, xTo, yTo);
		return this.getAccessibleCells(xFrom, yFrom).indexOf([xTo, yTo]) >= 0;
	}

	static * _computeCells(x, y, f) {
		let i = x;
		let j = y;
		while (isInMap(i, j)) {
			yield [i, j];
			let [i, j] = f(i, j);
		}
	}
}