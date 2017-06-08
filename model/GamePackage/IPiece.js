/**
 * Created by thareau on 28/05/17.
 */

import { assertInstanceOf, assertIsTile } from '../../util/general'
import { IGame } from './IGame'

export class IPiece {
	constructor (isWhite) {
		assertInstanceOf(isWhite, Boolean)
	}

	getPath (xFrom, yFrom, xTo, yTo) {
		assertIsTile(xFrom, yFrom)
		assertIsTile(xTo, yTo)
	}

	_checkParamsIsCellAccessible(xFrom, yFrom, xTo, yTo, game){
		assertIsTile(xFrom, yFrom)
		assertIsTile(xTo, yTo)
		assertInstanceOf(game, IGame)
	}

	isCellAccessible (xFrom, yFrom, xTo, yTo, game) {
		this._checkParamsIsCellAccessible(xFrom, yFrom, xTo, yTo, game)
	}

	canAttackTile (x, y, game) {
		assertIsTile(x, y)
		assertInstanceOf(game, IGame)
	}

	getAccessibleCells (xFrom, yFrom) {
		assertIsTile(xFrom, yFrom)
	}
}