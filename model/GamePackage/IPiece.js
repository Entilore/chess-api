/**
 * Created by thareau on 28/05/17.
 */

class IPiece {
	constructor() {};

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