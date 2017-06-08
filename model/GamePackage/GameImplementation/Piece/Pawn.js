/**
 * Created by thareau on 28/05/17.
 */
import { isInMap } from '../../../../util/general'
import { Piece } from './Piece'
import { NotOnBoardError } from '../../errors/GameErrors'
let whiteInstance
let blackInstance

export class Pawn extends Piece {
	constructor (isWhite) {
		super(isWhite)
	}

	getNextLine (n, times = 1) {
		if (this.isWhite) return n + times
		return n - times
	}

	_beginningLine () {
		if (this.isWhite) return 1
		return 6
	}

	isPathUsable (xFrom, yFrom, xTo, yTo, game) {
		return !game.getPiece(xTo, yTo)
	}

	isTileTheoreticallyAccessible (xFrom, yFrom, xTo, yTo) {
		// piece have to stay on the same column
		if (xFrom !== xTo) return false
		// piece may advance with 2 if on the beginning line
		if (yFrom === this._beginningLine() && this.getNextLine(yFrom, 2) === yTo) return true
		// otherwise shall go to the next line
		return yTo === this.getNextLine(yFrom)
	}

	isTileSpeciallyAccessible (xFrom, yFrom, xTo, yTo, game) {
		if ((xFrom === xTo - 1 || xFrom === xTo + 1) && yTo === this.getNextLine(yFrom)) {
			let isBlackPiece = !!game.getPiece(xTo, yTo, !this.isWhite)
			return !!game.getPiece(xTo, yTo, !this.isWhite)
		}
		return false
	}

	getAccessibleCells (x, y) {
		// a queen is a rook and a bishop...
		let ret = []
		let nextY = this.getNextLine(y)
		if (isInMap(nextY)) ret.push([x, nextY])

		if (y === this._beginningLine()) ret.push([x, this.getNextLine(y, 2)])

		return ret
	}

	canAttackTile (x, y, game) {
		super.canAttackTile(x, y, game)
		let nextLine = this.getNextLine(y, -1)
		let piece = game.getPiece(x - 1, nextLine, this.isWhite) || game.getPiece(x + 1, nextLine, this.isWhite)
		return piece && piece instanceof Pawn
	}
}