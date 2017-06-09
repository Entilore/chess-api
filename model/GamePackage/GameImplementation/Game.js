/**
 * Created by thareau on 29/05/17.
 */
import { IGame } from '../IGame'
import { Tile } from './Tile'
import { PieceFactory } from './Piece/Piece'
import { Pawn } from './Piece/Pawn'
import { Knight } from './Piece/Knight'
import { Rook } from './Piece/Rook'
import { Queen } from './Piece/Queen'
import { Bishop } from './Piece/Bishop'
import { King } from './Piece/King'
import { MoveError } from '../errors/GameErrors'
import { RoundFactory } from './RoundFactory'

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

	getPiece (x, y, isWhite) {
		let map = this.map
		let piece = null
		if (map[x] && map[x][y]) piece = map[x][y]
		if (isWhite !== undefined && piece) {
			if (piece.isWhite === isWhite) return piece
			else return null
		}
		else return piece
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
		if (!this.state || !state || this.state !== state) {
			map = this._build_map()
			this._map = [map, this.state]
		}

		return map
	}

	move (xFrom, yFrom, xTo, yTo) {
		let piece = this.getPiece(xFrom, yFrom)
		let owner = this.getPlayer(piece.isWhite)

		owner.move(xFrom, yFrom, xTo, yTo)
		return piece
	}

	capture (x, y) {
		super.capture(x, y)
		let piece = this.getPiece(x, y)
		let owner = this.getPiece(piece.isWhite)
		owner.capture(x, y)
		return piece
	}

	uncapture (x, y, piece) {
		super.uncapture(x, y, piece)
		let player = this.getPlayer(piece.isWhite)
		player.setPiece(x, y, piece)
		return piece
	}

	isChess (player) {
		super.isChess(player)
		let [x, y] = player.kingPosition
		return this.isUnderAttack(x, y, !player.isWhite)
	}

	new_round (xFrom, yFrom, xTo, yTo, player) {
		let piece = this.getPiece(xFrom, yFrom)

		if (!piece.isCellAccessible(xFrom, yFrom, xTo, yTo, player.isWhite)) {
			throw new MoveError('Move is impossible')
		}

		let rf = new RoundFactory()
		rf.setGame(this)
		rf.setMoved(xFrom, yFrom, xTo, yTo)
		let round = rf.build()
		round.apply()
	}

	/**
	 * create a new map containing all the pieces
	 * @returns {Array<Array>}
	 * @private
	 */
	_build_map () {

		let map = []
		for (let i = 0; i < 8; i++) {
			if (!map[i]) map[i] = []
			for (let j = 0; j < 8; j++) {
				let piece = this.whitePlayer.getPiece(i, j) || this.blackPlayer.getPiece(i, j)
				if (piece) {
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

		let kingColumn = 4
		let line = activePlayer.figureLine
		let rookColumn = Rook.getCastlingColumn(side)
		let finalKingColumn
		if (side === Game.QUEEN_SIDE_CASTLING && activePlayer.queenSideCastlingIsPossible) {
			finalKingColumn = kingColumn - 2
		}
		else if (side === Game.KING_SIDE_CASTLING && activePlayer.kingSideCastlingIsPossible) {
			finalKingColumn = kingColumn + 2
		}
		else
			return false

		if (!this.isPiecesBetweenTiles(rookColumn, line, kingColumn, line)) {
			for (let [x, y] of Tile.getTilesBetween(kingColumn, line, finalKingColumn, line)) {
				if (this.isUnderAttack(x, y, !isWhite))
					return false
			}
			return true
		}
		return false
	}

	isPiecesBetweenTiles (xFrom, yFrom, xTo, yTo) {
		let [beginX, beginY] = Tile.firstTileInDirectionOf(xFrom, yFrom, xTo, yTo)

		// if tiles were neighbour, then no pieces between both
		if (beginX === xTo && beginY === yTo) return false

		let [endX, endY] = Tile.firstTileInDirectionOf(xTo, yTo, xFrom, yFrom)

		for (let [i, j] of Tile.getTilesBetween(beginX, beginY, endX, endY)) {
			if (this.getPiece(i, j)) {
				return true
			}
		}

		return false
	}

	getPlayer (isWhite) {
		if (isWhite) return this.whitePlayer
		return this.blackPlayer
	}

	isUnderAttack (x, y, attackerIsWhite) {
		let pf = PieceFactory.getInstance()

		// check for pawns
		let pawn = pf.createPiece(Pawn, attackerIsWhite)
		if (pawn.canAttackTile(x, y, this)) return true
		// check for knight
		let knight = pf.createPiece(Knight, attackerIsWhite)
		if (knight.canAttackTile(x, y, this)) return true

		// check for king
		let king = pf.createPiece(King, attackerIsWhite)
		if (king.canAttackTile(x, y, this)) return true

		// check for Rook and Queen
		if (this._checkNoPieceFromInstanceInDirection(
				x, y, attackerIsWhite,
				[[1, 0], [0, 1], [-1, 0], [0, -1]],
				[Rook, Queen],
			)) return true
		// check for bishop and Queen
		return this._checkNoPieceFromInstanceInDirection(
			x, y, attackerIsWhite,
			[[1, 1], [-1, -1], [-1, 1], [1, -1]],
			[Bishop, Queen],
		)

	}

	/**
	 * checks no instance of a class is present in a direction
	 * @param x the X of the starting tile
	 * @param y the Y of the starting tile
	 * @param color the color of the piece to look
	 * @param directions the directions to take, see Tile.getTilesInDirection for more details
	 * @param classes the classes the piece shall not be
	 * @returns {boolean} whether an instance of this class was found
	 * @private
	 */
	_checkNoPieceFromInstanceInDirection (x, y, color, directions, classes) {
		for (let [xIncrement, yIncrement] of directions) {
			for (let [i, j] of Tile.getTilesInDirection(x, y, xIncrement, yIncrement)) {
				let piece = this.getPiece(i, j)
				if (piece) {
					for (let clazz of classes)
						if (piece instanceof clazz && piece.isWhite === color) return true
					break
				}
			}
		}
		return false
	}

	get ascii_art_representation () {
		let s = ''
		let m = this.map
		for (let i = 7; i >= 0; i--) {
			s += ' +' + '-+'.repeat(8) + '\n' + i + '|'
			for (let j = 0; j < 8; j++) {
				let p = m[j][i]
				let letter = ' '
				if (p) {
					letter = p.constructor.name[0]
					if (!p.isWhite) letter = letter.toLowerCase()
				}
				s += letter + '|'
			}
			s += '\n'
		}
		s += ' +' + '-+'.repeat(8) + '\n  0 1 2 3 4 5 6 7'
		return s
	}
}

