/**
 * Created by thareau on 28/05/17.
 */
import { assertInstanceOf, assertIsTile } from '../../util/general'
import { IPiece } from './IPiece'
import { IGame } from './IGame'
export class IRound {
	constructor (game, moved, captured = undefined, impliedMove = undefined, previous = undefined) {
		assertInstanceOf(game, IGame)
		for (let elt of [moved, impliedMove]) {
			if (elt) {
				let [xFrom, yFrom, xTo, yTo, piece] = elt
				assertIsTile(xFrom, yFrom)
				assertIsTile(xTo, yTo)
				assertInstanceOf(piece, IPiece)
			}
		}
		if (captured) {
			let [x, y, piece] = captured
			assertIsTile(x, y)
			assertInstanceOf(piece, IPiece)
		}

		if (previous)
			assertInstanceOf(previous, IRound)
	}
}