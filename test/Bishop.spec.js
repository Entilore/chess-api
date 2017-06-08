/**
 * Created by thareau on 01/06/17.
 */

import { getEmptyGame, getGameWithConfiguration } from './testUtility.spec'
import { Pawn } from '../model/GamePackage/GameImplementation/Piece/Pawn'
import { it } from 'mocha'
import { PieceFactory } from '../model/GamePackage/GameImplementation/Piece/Piece'
import { Bishop } from '../model/GamePackage/GameImplementation/Piece/Bishop'
let pf = PieceFactory.getInstance()

export class BishopTest {
	constructor () {
		this.whiteKnight = pf.createPiece(Bishop, true)
		// not really necessary, since no difference
		this.blackKnight = pf.createPiece(Bishop, false)
		this.emptyGame = getEmptyGame()
		this.testedPiece = 'Bishop'
	}

	cellIsAccessibleTest () {
		this.whiteKnight.isCellAccessible(0, 0, 5, 5, this.emptyGame).should.be.true
		this.whiteKnight.isCellAccessible(1, 0, 6, 5, this.emptyGame).should.be.true
		this.whiteKnight.isCellAccessible(7, 0, 0, 7, this.emptyGame).should.be.true

		this.blackKnight.isCellAccessible(0, 7, 7, 0, this.emptyGame).should.be.true
	}

	cellIsNotAccessibleTest () {
		this.whiteKnight.isCellAccessible(0, 0, 0, 0, this.emptyGame).should.be.false
		this.whiteKnight.isCellAccessible(5, 2, 4, 4, this.emptyGame).should.be.false

		this.blackKnight.isCellAccessible(3, 5, 1, 6, this.emptyGame).should.be.false
	}

	cellIsOutOfTheBoard () {
		(() => this.whiteKnight.isCellAccessible(7, 7, 8, 8, this.emptyGame)).should.throw();
		(() => this.whiteKnight.isCellAccessible(1, 7, 2, 8, this.emptyGame)).should.throw();

		(() => this.blackKnight.isCellAccessible(7, 8, 7, 7, this.emptyGame)).should.throw();
		(() => this.blackKnight.isCellAccessible(1, 8, 1, 7, this.emptyGame)).should.throw()
	}

	specialCaseTest () { }

	movingToAnotherPiece () {
		let whitePieces = new Map([[this.whiteKnight, [[7, 7]]]])
		let blackPieces = new Map([[this.blackKnight, [[4, 4]]]])
		let game = getGameWithConfiguration(whitePieces, blackPieces)

		this.whiteKnight.isCellAccessible(7, 7, 5, 5, game).should.be.true
		this.whiteKnight.isCellAccessible(7, 7, 0, 0, game).should.be.false
	}

}