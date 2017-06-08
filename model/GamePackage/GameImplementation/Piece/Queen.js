/**
 * Created by thareau on 28/05/17.
 */

import {Rook} from './Rook';
import {Bishop} from './Bishop';
import { Piece, PieceFactory } from './Piece'
let instance;

export class Queen extends Piece {
	constructor(isWhite) {
		super(isWhite);
		this.pathes = {};
	}

	isCellAccessible(xFrom, yFrom, xTo, yTo, game) {
		super.isCellAccessible(xFrom, yFrom, xTo, yTo, game)
		// a queen is a rook and a bishop...
		let pf = PieceFactory.getInstance()
		let rook = pf.createPiece(Rook, this.isWhite)
		let bishop = pf.createPiece(Bishop, this.isWhite)

		return rook.isCellAccessible(xFrom, yFrom, xTo, yTo, game) || bishop.isCellAccessible(xFrom, yFrom, xTo, yTo, game);
	}

	getAccessibleCells(x, y) {
		// a queen is a rook and a bishop...
		let rook = new Rook();
		let bishop = new Bishop();

		let rookCells = rook.getAccessibleCells(x, y).clone();
		let bishopCells = bishop.getAccessibleCells(x, y).clone();

		return Array.prototype.push.apply(rookCells, bishopCells);
	}
}