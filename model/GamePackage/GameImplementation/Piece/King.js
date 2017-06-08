/**
 * Created by thareau on 28/05/17.
 */

import { assertInstanceOf, assertIsTile, isInMap } from '../../../../util/general'
import { adjacentDistance } from '../../../../util/map'
import { Piece } from './Piece'
import { Game } from '../Game'
let instance

export class King extends Piece {
	constructor (isWhite) {
		super(isWhite)
		this.pathes = {}
	}

	isTileTheoreticallyAccessible (xFrom, yFrom, xTo, yTo){
		throw new Error("Irrelevant here")
	}

	isCellAccessible (xFrom, yFrom, xTo, yTo, game) {
		super._checkParamsIsCellAccessible(xFrom, yFrom, xTo, yTo, game)

		if (adjacentDistance(xFrom, yFrom, xTo, yTo) === 1) return true

		if (this.isInitialCell(xFrom, yFrom) && yTo === this._figureLine) {
			// queen side castling
			let side = -1
			if (xTo === 2) {
				side = Game.QUEEN_SIDE_CASTLING
			}
			if (xTo === 6) {
				// king side castling
				side = Game.KING_SIDE_CASTLING
			}

			if (side !== -1) {
				return game.isCastlingPossible(this.isWhite, side)
			}
		}

		return false
	}

	* getInitialPosition () {
		yield [4, this._figureLine]
	}

	static * _computeCells (n) {
		for (let i of [-1, 0, 1]) {
			let v = i + n
			if (isInMap(v)) yield v
		}
	}

	static * _getTilesAccessible (x, y) {
		for (const i of King._computeCells(x)) {
			for (const j of King._computeCells(y)) {
				// push if not original cell
				if (i !== x || j !== y) {
					yield [i, j]
				}
			}
		}
	}

	getAccessibleCells (x, y) {
		// speed-optimization, may be deleted if more space needed
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]]

		super.getAccessibleCells(x, y)
		let cells = [...King._getTilesAccessible(x, y)]

		this.pathes[[x, y]] = cells
		return cells
	}

	isInitialCell (x, y) {
		let [initialX, initialY] = this.getInitialPosition().next().value
		return x === initialX && y === initialY
	}

	canAttackTile (x, y, game) {
		super.canAttackTile(x, y, game)

		for (let [i, j] of King._getTilesAccessible(x, y)) {
			let piece = game.getPiece(i, j, this.isWhite)
			if (piece && piece instanceof King)
				return true
		}
		return false
	}
}