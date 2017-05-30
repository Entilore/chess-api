/**
 * Created by thareau on 28/05/17.
 */

import {assertInstanceOf} from '../../util/general';
export class IPiece {
	constructor(isWhite) {
		assertInstanceOf(isWhite, Boolean);
	};

	getPath(xFrom, yFrom, xTo, yTo) {
		assertInstanceOf(xFrom, Number);
		assertInstanceOf(yFrom, Number);
		assertInstanceOf(xTo, Number);
		assertInstanceOf(yTo, Number);

	}

	isCellAccessible(xFrom, yFrom, xTo, yTo) {
		assertInstanceOf(xFrom, Number);
		assertInstanceOf(yFrom, Number);
		assertInstanceOf(xTo, Number);
		assertInstanceOf(yTo, Number);

	}

	getAccessibleCells(xFrom, yFrom) {
		assertInstanceOf(xFrom, Number);
		assertInstanceOf(yFrom, Number);
	};
}