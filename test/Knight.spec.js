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
		this.whiteBishop = pf.createPiece(Knight, true)
		// not really necessary, since no difference
		this.blackBishop = pf.createPiece(Knight, false)
		this.emptyGame = getEmptyGame()
		this.testedPiece = 'Knight'
	}

	cellIsAccessibleTest (game) {
		game = game || this.emptyGame
		this.whiteBishop.isCellAccessible(2, 2, 0, 1, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 0, 3, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 1, 0, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 1, 4, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 3, 0, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 3, 4, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 4, 1, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 4, 3, game).should.be.true
	}

	cellIsNotAccessibleTest () {
		this.whiteBishop.isCellAccessible(2, 2, 3, 3, this.emptyGame).should.be.false
		this.whiteBishop.isCellAccessible(2, 2, 7, 7, this.emptyGame).should.be.false
		this.whiteBishop.isCellAccessible(2, 2, 2, 5, this.emptyGame).should.be.false
		this.whiteBishop.isCellAccessible(2, 2, 5, 2, this.emptyGame).should.be.false
	}

	cellIsOutOfTheBoard () {
		(() => this.whiteBishop.isCellAccessible(7, 7, 5, 8, this.emptyGame)).should.throw();
		(() => this.whiteBishop.isCellAccessible(5, 8, 7, 7, this.emptyGame)).should.throw();

		(() => this.blackBishop.isCellAccessible(7, 7, 5, 8, this.emptyGame)).should.throw();
		(() => this.blackBishop.isCellAccessible(5, 8, 7, 7, this.emptyGame)).should.throw()
	}

	specialCaseTest () {
		let whitePawn = pf.createPiece(Pawn, true)
		let blackPawn = pf.createPiece(Pawn, false)
		let whitePieces = new Map([[whitePawn, [
			[3, 1],
			[3, 2],
			[3, 3],
			[2, 1],
		], [this.whiteBishop, [2, 2]]]])
		let blackPieces = new Map([[blackPawn, [[1, 1], [1, 2], [1, 3], [2, 3]]]])

		let game = getGameWithConfiguration(whitePieces, blackPieces)
		it('should accept a move going over another piece', () => {
			this.cellIsAccessibleTest(game)
		})
	}

	movingToAnotherPiece () {
		let whitePieces = new Map([[this.whiteBishop, [[2, 2], [0, 3]]]])
		let blackPieces = new Map([[this.blackBishop, [[0, 1]]]])
		let game = getGameWithConfiguration(whitePieces, blackPieces)

		this.whiteBishop.isCellAccessible(2, 2, 0, 1, game).should.be.true
		this.whiteBishop.isCellAccessible(2, 2, 0, 3, game).should.be.false
	}

}