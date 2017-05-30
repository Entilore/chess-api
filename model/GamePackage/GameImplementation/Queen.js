/**
 * Created by thareau on 28/05/17.
 */

import {Rook} from './Rook';
import {Bishop} from './Bishop';
import {Piece} from './Piece';
let instance;

export class Queen extends Piece {
	constructor() {
		if (instance) return instance;
		super();

		this.pathes = {};
		instance = this;
	};

	getAccessibleCells(x, y) {
		// a queen is a rook and a bishop...
		let rook = new Rook();
		let bishop = new Bishop();

		let rookCells = rook.getAccessibleCells(x,y).clone();
		let bishopCells = bishop.getAccessibleCells(x,y).clone();

		return Array.prototype.push.apply(rookCells, bishopCells);
	}
}