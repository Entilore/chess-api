/**
 * Created by thareau on 01/06/17.
 */

import { getEmptyGame, getGameWithConfiguration } from './testUtility.spec'
import { Pawn } from '../model/GamePackage/GameImplementation/Piece/Pawn'
import { it } from 'mocha'
import { PieceFactory } from '../model/GamePackage/GameImplementation/Piece/Piece'
import { Rook } from '../model/GamePackage/GameImplementation/Piece/Rook'
let pf = PieceFactory.getInstance()

export class RookTest {
	constructor () {
		this.whiteRook = pf.createPiece(Rook, true)
		// not really necessary, since no difference
		this.blackRook = pf.createPiece(Rook, false)
		this.emptyGame = getEmptyGame()
		this.testedPiece = 'Rook'
	}

	cellIsAccessibleTest () {
		this.whiteRook.isCellAccessible(4, 3, 0, 3, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 1, 3, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 2, 3, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 3, 3, this.emptyGame).should.be.true

		this.whiteRook.isCellAccessible(4, 3, 5, 3, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 6, 3, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 7, 3, this.emptyGame).should.be.true

		this.whiteRook.isCellAccessible(4, 3, 4, 0, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 4, 1, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 4, 2, this.emptyGame).should.be.true

		this.whiteRook.isCellAccessible(4, 3, 4, 4, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 4, 5, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 4, 6, this.emptyGame).should.be.true
		this.whiteRook.isCellAccessible(4, 3, 4, 7, this.emptyGame).should.be.true
	}

	cellIsNotAccessibleTest () {

		this.whiteRook.isCellAccessible(4, 3, 0, 7, this.emptyGame).should.be.false
		this.whiteRook.isCellAccessible(4, 3, 3, 4, this.emptyGame).should.be.false
		this.whiteRook.isCellAccessible(4, 3, 6, 1, this.emptyGame).should.be.false
		this.whiteRook.isCellAccessible(4, 3, 1, 0, this.emptyGame).should.be.false
		this.whiteRook.isCellAccessible(4, 3, 6, 5, this.emptyGame).should.be.false

		this.whiteRook.isCellAccessible(4, 3, 3, 4, this.emptyGame).should.be.false
		this.whiteRook.isCellAccessible(4, 3, 7, 2, this.emptyGame).should.be.false


	}

	cellIsOutOfTheBoard () {
		(() => this.whiteRook.isCellAccessible(7, 5, 7, 8, this.emptyGame)).should.throw();
		(() => this.whiteRook.isCellAccessible(1, 2, 1, 8, this.emptyGame)).should.throw();

		(() => this.blackRook.isCellAccessible(7, 8, 7, 7, this.emptyGame)).should.throw();
		(() => this.blackRook.isCellAccessible(1, 8, 1, 7, this.emptyGame)).should.throw()
	}

	specialCaseTest () { }

	movingToAnotherPiece () {
		let whitePieces = new Map([[this.whiteRook, [[4, 7], [6, 7]]]])
		let blackPieces = new Map([[this.blackRook, [[4, 4]]]])
		let game = getGameWithConfiguration(whitePieces, blackPieces)

		console.log(game.ascii_art_representation)

		this.whiteRook.isCellAccessible(4, 7, 4, 6, game).should.be.true
		this.whiteRook.isCellAccessible(4, 7, 4, 5, game).should.be.true
		this.whiteRook.isCellAccessible(4, 7, 4, 4, game).should.be.true
	x	this.whiteRook.isCellAccessible(4, 7, 4, 3, game).should.be.false
		this.whiteRook.isCellAccessible(4, 7, 4, 2, game).should.be.false


		this.whiteRook.isCellAccessible(4, 7, 5, 7, game).should.be.true
		this.whiteRook.isCellAccessible(4, 7, 6, 7, game).should.be.false
		this.whiteRook.isCellAccessible(4, 7, 7, 7, game).should.be.false
	}

}