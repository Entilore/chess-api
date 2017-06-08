/**
 * Created by thareau on 28/05/17.
 */

import { isInMap } from '../../../../util/general'
import { Piece } from './Piece'
import { manhattanDistance } from '../../../../util/map'

export class Knight extends Piece {
	constructor (isWhite) {
		super(isWhite)
		this.pathes = {}
	}

	isPathUsable (xFrom, yFrom, xTo, yTo, game) {
		const pieceOfDestination = game.getPiece(xTo, yTo)
		return !pieceOfDestination || pieceOfDestination.isWhite !== this.isWhite
	}

	isTileTheoreticallyAccessible (xFrom, yFrom, xTo, yTo) {
		return xFrom !== xTo && yFrom !== yTo
			&& manhattanDistance(xFrom, yFrom, xTo, yTo) === 3
	}

	getAccessibleCells (x, y) {
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]]

		super.getAccessibleCells(x, y)

		let cells = [...Knight._getTilesAccessible(x, y)]
		this.pathes[[x, y]] = cells
		return cells
	}

	static * _getTilesAccessible (x, y) {
		for (let [i, j] of [
			[x - 2, y - 1],
			[x + 2, y - 1],
			[x - 2, y + 1],
			[x + 2, y + 1],
			[x - 1, y - 2],
			[x - 1, y + 2],
			[x + 1, y - 2],
			[x + 1, y + 2],
		]) {
			if (isInMap(i, j))
				yield [i, j]
		}
	}

	canAttackTile (x, y, game) {
		super.canAttackTile(x, y, game)
		for (let [i, j] of Knight._getTilesAccessible(x, y)) {
			let piece = game.getPiece(i, j, this.isWhite)
			if (piece && piece instanceof Knight && piece.isWhite === this.isWhite)
				return true
		}
		return false
	}
}