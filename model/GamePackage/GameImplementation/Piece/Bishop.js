/**
 * Created by thareau on 28/05/17.
 */

import { Piece } from './Piece'

export class Bishop extends Piece {
	constructor (isWhite) {
		super(isWhite)
		this.pathes = {}
	}

	isCellAccessible (xFrom, yFrom, xTo, yTo, game) {
		super.isCellAccessible(xFrom, yFrom, xTo, yTo, game)
		// cannot be on same line or column
		if (xFrom === xTo || yFrom === yTo) return false

		// |slope| === 1
		// | (yFrom - yTo) / (xFrom - xTo) | === 1
		// |yFrom - yTo| / |xFrom - xTo| === 1
		// |yFrom - yTo|  === |xFrom - xTo|

		if (Math.abs(yFrom - yTo) === Math.abs(xFrom - xTo)) {
			return !game.isPiecesBetweenTiles(xFrom, yFrom, xTo, yTo)
		}
		return false
	}

	getAccessibleCells (x, y) {
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]]

		super.getAccessibleCells(x, y)
		let cells = []

		for (let f of [
			(i, j) => [i + 1, j + 1],
			(i, j) => [i + 1, j - 1],
			(i, j) => [i - 1, j + 1],
			(i, j) => [i - 1, j - 1]]
			) {
			for (let [i, j] of Piece._computeCells(x, y, f)) {
				if (i !== x && j !== y) cells.push([i, j])
			}
		}

		this.pathes[[x, y]] = cells
		return cells
	}
}