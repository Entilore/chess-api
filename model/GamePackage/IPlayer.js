/**
 * Created by thareau on 28/05/17.
 */
import { assertInstanceOf, assertIsTile } from '../../util/general'
import { IPiece } from './IPiece'
export class IPlayer {
	constructor (user) {
	}

	setupPieces (isWhite) {}

	move (xFrom, yFrom, xTo, yTo) {
		assertIsTile(xFrom, yFrom)
		assertIsTile(xTo, yTo)
	}

	capture (x, y) {
		assertIsTile(x, y)
	}

	setPiece (x, y, piece) {
		assertIsTile(x, y)
		assertInstanceOf(piece, IPiece)
	}

}