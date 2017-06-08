/**
 * Created by thareau on 28/05/17.
 */

import { assertInstanceOf } from '../../util/general'
import { IGame } from './IGame'
export class IPiece {
	constructor (isWhite) {
		assertInstanceOf(isWhite, Boolean)
	};

	getPath (xFrom, yFrom, xTo, yTo) {
		assertInstanceOf(xFrom, Number)
		assertInstanceOf(yFrom, Number)
		assertInstanceOf(xTo, Number)
		assertInstanceOf(yTo, Number)
	}

	isCellAccessible (xFrom, yFrom, xTo, yTo) {
		assertInstanceOf(xFrom, Number)
		assertInstanceOf(yFrom, Number)
		assertInstanceOf(xTo, Number)
		assertInstanceOf(yTo, Number)

	}

	canAttackTile (x, y, game) {
		assertInstanceOf(x, Number)
		assertInstanceOf(y, Number)
		assertInstanceOf(game, IGame)
	}

	getAccessibleCells (xFrom, yFrom) {
		assertInstanceOf(xFrom, Number)
		assertInstanceOf(yFrom, Number)
	}
}