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

	createPiece (clazz, isWhite) {
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
		this._isWhite = isWhite
		this._figureLine = 7
		this._pawnLine = 6
		if (this.isWhite) {
			this._figureLine = 0
			this._pawnLine = 1
		}

	}

	get isWhite () { return this._isWhite}

	isPathUsable (xFrom, yFrom, xTo, yTo, game) {
		const pieceOnDestination = game.getPiece(xTo, yTo)
		const pieceIsNotOwned = !pieceOnDestination || pieceOnDestination.isWhite !== this.isWhite
		return pieceIsNotOwned && !game.isPiecesBetweenTiles(xFrom, yFrom, xTo, yTo)
	}

	isTileTheoreticallyAccessible (xFrom, yFrom, xTo, yTo){
		throw new Error("Abstract function, have to be implemented")
	}

	/**
	 * determine if a tile is accessible from another tile
	 * @param xFrom
	 * @param yFrom
	 * @param xTo
	 * @param yTo
	 * @param game
	 */
	isCellAccessible (xFrom, yFrom, xTo, yTo, game) {
		super.isCellAccessible(xFrom, yFrom, xTo, yTo, game)

		const theoretically = this.isTileTheoreticallyAccessible(xFrom, yFrom, xTo, yTo)
		const pathUsable = this.isPathUsable(xFrom, yFrom, xTo, yTo, game)
		return theoretically && pathUsable
	}

	/**
	 * determine if any instance of the current piece can attack the given tile
	 * @param x
	 * @param y
	 * @param game
	 */
	canAttackCell (x, y, game) {
		super.canAttackTile(x, y, game)
		if (!isInMap(x, y)) throw new NotOnBoardError(x, y)
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