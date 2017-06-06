/**
 * Created by thareau on 29/05/17.
 */
import { IGame } from '../IGame'
import { Tile } from './Tile'

export class Game extends IGame {
	constructor (player1, player2) {
		if (Math.random() > 0.5) super(player1, player2)
		else super(player2, player1)

		this.whitePlayer.isWhite = true
		this.blackPlayer.isWhite = false

		this._map = [[], this.state]
		// add the pieces to the players
		this.whitePlayer.setupPieces()
		this.blackPlayer.setupPieces()
	}

	static get KING_SIDE_CASTLING () {return 1}

	static get QUEEN_SIDE_CASTLING () {return 2}

	getPiece (x, y) {
		let map = this.map
		if (map[x] && map[x][y]) return map[x][y]
		return null
	}

	getPieces (positionsList) {
		let piecesMap = new Map()
		for (let [x, y] of positionsList) {
			let piece = this.getPiece(x, y)
			if (piece) piecesMap.set([x, y], piece)
		}

		return piecesMap
	}

	get map () {
		// load saved map, if state !=, rebuild
		let [map, state] = this._map
		if (!this.state || this.state !== state) {
			map = this._build_map()
			this._map = [map, this.state]
		}

		return map
	}

	/**
	 * create a new map containing all the pieces
	 * @returns {Array<Array>}
	 * @private
	 */
	_build_map () {

		let map = []
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let piece = this.whitePlayer.getPiece(i, j) || this.blackPlayer.getPiece(i, j)
				if (piece) {
					if (!map[i]) map[i] = []
					map[i][j] = piece
				}
			}
		}
		return map
	}

	isCastlingPossible (isWhite, side) {
		if (side !== Game.KING_SIDE_CASTLING && side !== Game.QUEEN_SIDE_CASTLING)
			throw new Error('Unknown side')

		let activePlayer = this.getPlayer(isWhite)

		let endColumn = 4
		let line = activePlayer.figureLine
		let beginColumn
		if (side === Game.QUEEN_SIDE_CASTLING && activePlayer.queenSideCastlingIsPossible) {
			beginColumn = 0
		}
		else if (side === Game.KING_SIDE_CASTLING && activePlayer.kingSideCastlingIsPossible) {
			beginColumn = 7
		}
		else
			return false

		return this.isTileBetween(beginColumn, line, endColumn, line)
	}

	isTileBetween (xFrom, yFrom, xTo, yTo) {
		let [beginX, beginY] = Tile.firstTileInDirectionOf(xFrom, yFrom, xTo, yTo)
		let [endX, endY] = Tile.firstTileInDirectionOf(xTo, yTo, xFrom, yFrom)

		for (let [i, j] of Game.getTilesBetween(beginX, beginY, endX, endY)) {
			if (this.getPiece(i, j)) {
				return false
			}
		}

		return true
	}

	getPlayer (isWhite) {
		if (isWhite) return this.whitePlayer
		return this.blackPlayer
	}

	static * _getIndexGenerator (i, j, strict = false) {
		if (i < j) {
			if (strict) j--
			for (let n = i; n <= j; n++)
				yield n;
		}
		else {
			if (strict) j++
			for (let n = i; n >= j; n--)
				yield n;
		}
	}

	static * getTilesBetween (xFrom, yFrom, xTo, yTo) {
		if (xFrom === xTo || yFrom === yTo) {
			for (let i of Game._getIndexGenerator(xFrom, xTo)) {
				for (let j of Game._getIndexGenerator(yFrom, yTo)) {
					yield [i, j]
				}
			}
		} else {
			throw new Error('Not yet implemented')
		}
	}
}

