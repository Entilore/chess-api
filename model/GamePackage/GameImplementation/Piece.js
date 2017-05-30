/**
 * Created by thareau on 28/05/17.
 */

import {assertInstanceOf, isInMap} from '../../../util/general';
import {IPiece} from '../IPiece';

let instance;
class PieceFactory {
	constructor() {
		if (instance)
			return instance;
		this.pieceClasses = {};
		instance = this;
	}

	static getInstance() {
		if (instance) instance = new PieceFactory();
		return instance
	}

	getInstance(clazz, isWhite) {
		let key = [clazz.name, isWhite];
		if (!this.pieceClasses[key]) this.pieceClasses[key] = new clazz(isWhite);
		let obj = this.pieceClasses[key];
		try {
			assertInstanceOf(obj, Piece);
		} catch (e) {
			delete this.pieceClasses[key];
			throw e;
		}
		return this.pieceClasses[key];
	}

}

class Piece extends IPiece {
	constructor(isWhite) {super(isWhite);}


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

export {Piece, PieceFactory}