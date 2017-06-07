/**
 * Created by thareau on 28/05/17.
 */

import { assertInstanceOf, isInMap } from '../../../../util/general'
import { IPiece } from '../../IPiece'
import { NotOnBoardError } from '../../errors/GameErrors'

let instance
class PieceFactory {
	constructor () {
		if (instance)
			return instance
		this.pieceClasses = {}
		instance = this
	}

	static getInstance () {
		if (!instance) instance = new PieceFactory()
		return instance
	}

	getInstance (clazz, isWhite) {
		let key = [clazz.name, isWhite]
		if (!this.pieceClasses[key]) this.pieceClasses[key] = new clazz(isWhite)
		let obj = this.pieceClasses[key]
		try {
			assertInstanceOf(obj, Piece)
		} catch (e) {
			delete this.pieceClasses[key]
			throw e
		}
		return this.pieceClasses[key]
	}

}

class Piece extends IPiece {
	constructor (isWhite) {
		super(isWhite)
		this.isWhite = isWhite
		this._figureLine = 7
		this._pawnLine = 6
		if (this.isWhite) {
			this._figureLine = 0
			this._pawnLine = 1
		}

	}

	isCellAccessible (xFrom, yFrom, xTo, yTo, game) {
		super.isCellAccessible(xFrom, yFrom, xTo, yTo)

		if (!isInMap(xFrom, yFrom)) throw new NotOnBoardError(xFrom, yFrom)
		if (!isInMap(xTo, yTo)) throw new NotOnBoardError(xTo, yTo)

		//		return this.getAccessibleCells(xFrom, yFrom).indexOf([xTo, yTo]) >= 0;
	}

	static * _computeCells (x, y, f) {
		let i = x
		let j = y
		while (isInMap(i, j)) {
			yield [i, j]
			let [i, j] = f(i, j)
		}
	}
}

export { Piece, PieceFactory }