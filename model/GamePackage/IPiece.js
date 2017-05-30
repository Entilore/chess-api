/**
 * Created by thareau on 28/05/17.
 */

import {assertInstanceOf} from '../../util/general';
class IPiece {
	constructor() {};

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