/**
 * Created by thareau on 01/06/17.
 */

import { getEmptyGame, getGameWithConfiguration } from './testUtility.spec'
import { Pawn } from '../model/GamePackage/GameImplementation/Piece/Pawn'
import { PieceFactory } from '../model/GamePackage/GameImplementation/Piece/Piece'
import { Knight } from '../model/GamePackage/GameImplementation/Piece/Knight'
import { it } from 'mocha'
let pf = PieceFactory.getInstance()

export class KnightTest {
	constructor () {
		this.whiteKnight = pf.createPiece(Knight, true)
		// not really necessary, since no difference
		this.blackKnight = pf.createPiece(Knight, false)
		this.emptyGame = getEmptyGame()
		this.testedPiece = 'Knight'
	}

	cellIsAccessibleTest (game) {
		game = game || this.emptyGame
		this.whiteKnight.isCellAccessible(2, 2, 0, 1, game).should.be.true
		this.whiteKnight.isCellAccessible(2, 2, 0, 3, game).should.be.true
		this.whiteKnight.isCellAccessible(2, 2, 1, 0, game).should.be.true
		this.whiteKnight.isCellAccessible(2, 2, 1, 4, game).should.be.true
		this.whiteKnight.isCellAccessible(2, 2, 3, 0, game).should.be.true
		this.whiteKnight.isCellAccessible(2, 2, 3, 4, game).should.be.true
		this.whiteKnight.isCellAccessible(2, 2, 4, 1, game).should.be.true
		this.whiteKnight.isCellAccessible(2, 2, 4, 3, game).should.be.true
	}

	cellIsNotAccessibleTest () {
		this.whiteKnight.isCellAccessible(2, 2, 3, 3, this.emptyGame).should.be.false
		this.whiteKnight.isCellAccessible(2, 2, 7, 7, this.emptyGame).should.be.false
		this.whiteKnight.isCellAccessible(2, 2, 2, 5, this.emptyGame).should.be.false
		this.whiteKnight.isCellAccessible(2, 2, 5, 2, this.emptyGame).should.be.false
	}

	cellIsOutOfTheBoard () {
		(() => this.whiteKnight.isCellAccessible(7, 7, 5, 8, this.emptyGame)).should.throw();
		(() => this.whiteKnight.isCellAccessible(5, 8, 7, 7, this.emptyGame)).should.throw();

		(() => this.blackKnight.isCellAccessible(7, 7, 5, 8, this.emptyGame)).should.throw();
		(() => this.blackKnight.isCellAccessible(5, 8, 7, 7, this.emptyGame)).should.throw()
	}

	specialCaseTest () {
		let whitePawn = pf.createPiece(Pawn, true)
		let blackPawn = pf.createPiece(Pawn, false)
		let whitePieces = new Map([[whitePawn, [
			[3, 1],
			[3, 2],
			[3, 3],
			[2, 1],
		], [this.whiteKnight, [2, 2]]]])
		let blackPieces = new Map([[blackPawn, [[1, 1], [1, 2], [1, 3], [2, 3]]]])

		let game = getGameWithConfiguration(whitePieces, blackPieces)
		it('should accept a move going over another piece', () => {
			this.cellIsAccessibleTest(game)
		})
	}

	movingToAnotherPiece () {
		let whitePieces = new Map([[this.whiteKnight, [[2, 2]]]])
		let blackPieces = new Map([[this.blackKnight, [[0, 1]]]])
		let game = getGameWithConfiguration(whitePieces, blackPieces)

		this.whiteKnight.isCellAccessible(2, 2, 0, 1, game).should.be.true
	}

}