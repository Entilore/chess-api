/**
 * Created by thareau on 01/06/17.
 */

import { getEmptyGame, getGameWithConfiguration } from './testUtility.spec'
import { Pawn } from '../model/GamePackage/GameImplementation/Piece/Pawn'
import { it } from 'mocha'
import { PieceFactory } from '../model/GamePackage/GameImplementation/Piece/Piece'
import { Queen } from '../model/GamePackage/GameImplementation/Piece/Queen'
let pf = PieceFactory.getInstance()

export class QueenTest {
	constructor () {
		this.whiteQueen = pf.createPiece(Queen, true)
		// not really necessary, since no difference
		this.blackQueen = pf.createPiece(Queen, false)
		this.emptyGame = getEmptyGame()
		this.testedPiece = 'Queen'
	}

	cellIsAccessibleTest () {
		this.whiteQueen.isCellAccessible(4, 3, 0, 3, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 1, 3, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 2, 3, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 3, 3, this.emptyGame).should.be.true

		this.whiteQueen.isCellAccessible(4, 3, 5, 3, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 6, 3, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 7, 3, this.emptyGame).should.be.true

		this.whiteQueen.isCellAccessible(4, 3, 4, 0, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 4, 1, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 4, 2, this.emptyGame).should.be.true

		this.whiteQueen.isCellAccessible(4, 3, 4, 4, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 4, 5, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 4, 6, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 4, 7, this.emptyGame).should.be.true

		this.whiteQueen.isCellAccessible(4, 3, 0, 7, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 1, 6, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 2, 5, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 3, 4, this.emptyGame).should.be.true

		this.whiteQueen.isCellAccessible(4, 3, 5, 2, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 6, 1, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 7, 0, this.emptyGame).should.be.true

		this.whiteQueen.isCellAccessible(4, 3, 1, 0, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 2, 1, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 3, 2, this.emptyGame).should.be.true

		this.whiteQueen.isCellAccessible(4, 3, 5, 4, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 6, 5, this.emptyGame).should.be.true
		this.whiteQueen.isCellAccessible(4, 3, 7, 6, this.emptyGame).should.be.true
	}

	cellIsNotAccessibleTest () {
		this.whiteQueen.isCellAccessible(4, 3, 0, 0, this.emptyGame).should.be.false
		this.whiteQueen.isCellAccessible(4, 3, 2, 2, this.emptyGame).should.be.false

		this.blackQueen.isCellAccessible(4, 3, 1, 7, this.emptyGame).should.be.false
	}

	cellIsOutOfTheBoard () {
		(() => this.whiteQueen.isCellAccessible(7, 7, 8, 8, this.emptyGame)).should.throw();
		(() => this.whiteQueen.isCellAccessible(1, 7, 2, 8, this.emptyGame)).should.throw();

		(() => this.blackQueen.isCellAccessible(7, 8, 7, 7, this.emptyGame)).should.throw();
		(() => this.blackQueen.isCellAccessible(1, 8, 1, 7, this.emptyGame)).should.throw()
	}

	specialCaseTest () { }

	movingToAnotherPiece () {
		let whitePieces = new Map([[this.whiteQueen, [[7, 7]]]])
		let blackPieces = new Map([[this.blackQueen, [[4, 4]]]])
		let game = getGameWithConfiguration(whitePieces, blackPieces)

		this.whiteQueen.isCellAccessible(7, 7, 5, 5, game).should.be.true
		this.whiteQueen.isCellAccessible(7, 7, 4, 4, game).should.be.true
		this.whiteQueen.isCellAccessible(7, 7, 0, 0, game).should.be.false
	}

}