/**
 * Created by thareau on 28/05/17.
 */
import {isInMap} from '../../../util/general';
let instance;

class Pawn extends Piece {
	constructor() {
		if (instance) return instance;
		super();

		instance = this;
	};

	getAccessibleCells(x, y) {
		// a queen is a rook and a bishop...
		if (isInMap(y+1)) return [[x, y+1]];
		return [];
	}
}