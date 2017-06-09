/**
 * Created by thareau on 28/05/17.
 */

import { Piece } from './Piece'
import { Game } from '../Game'

export class Rook extends Piece {
	constructor (isWhite) {
		super(isWhite)

		this.pathes = {}
	}

	* getInitialPosition () {
		yield [0, this._figureLine]
		yield [7, this._figureLine]
	}

	isTileTheoreticallyAccessible (xFrom, yFrom, xTo, yTo) {
		return (xFrom === xTo) !== (yFrom === yTo)
	}

	getAccessibleCells (x, y) {
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]]

		super.getAccessibleCells(x, y)
		let cells = []

		for (let i = 0; i < 8; i++) {
			cells.push([i, y])
			cells.push([x, i])
		}

		this.pathes[[x, y]] = cells
		return cells
	}

	canAttackTile (x, y, game) {
		super.canAttackTile(x, y, game)

	}

	static getCastlingColumn(side){
		let rookColumn
		if (side === Game.QUEEN_SIDE_CASTLING) {
			rookColumn = 0
		}
		else if (side === Game.KING_SIDE_CASTLING) {
			rookColumn = 7
		}
		return rookColumn

	}
}