/**
 * Created by thareau on 28/05/17.
 */

import { Piece } from './Piece'

export class Bishop extends Piece {
	constructor (isWhite) {
		super(isWhite)
		this.pathes = {}
	}

	isTileTheoreticallyAccessible (xFrom, yFrom, xTo, yTo) {
		// |slope| === 1
		// | (yFrom - yTo) / (xFrom - xTo) | === 1
		// |yFrom - yTo| / |xFrom - xTo| === 1
		// |yFrom - yTo|  === |xFrom - xTo|
		return (xFrom !== xTo && yFrom !== yTo) && Math.abs(yFrom - yTo) === Math.abs(xFrom - xTo)
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