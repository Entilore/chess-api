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
		this.whiteBishop = pf.getInstance(Bishop, true)
		// not really necessary, since no difference
		this.blackBishop = pf.getInstance(Bishop, false)
		this.emptyGame = getEmptyGame()
		this.testedPiece = 'Bishop'
	}

	cellIsAccessibleTest () {
		this.whiteBishop.isCellAccessible(0, 0, 5, 5, this.emptyGame).should.be.true
		this.whiteBishop.isCellAccessible(1, 0, 6, 5, this.emptyGame).should.be.true
		this.whiteBishop.isCellAccessible(7, 0, 0, 7, this.emptyGame).should.be.true

		this.blackBishop.isCellAccessible(0, 7, 7, 0, this.emptyGame).should.be.true
	}

	cellIsNotAccessibleTest () {
		this.whiteBishop.isCellAccessible(0, 0, 0, 0, this.emptyGame).should.be.false
		this.whiteBishop.isCellAccessible(5, 2, 4, 4, this.emptyGame).should.be.false

		this.blackBishop.isCellAccessible(3, 5, 1, 6, this.emptyGame).should.be.false
	}

	cellIsOutOfTheBoard () {
		(() => this.whiteBishop.isCellAccessible(7, 7, 8, 8, this.emptyGame)).should.throw();
		(() => this.whiteBishop.isCellAccessible(1, 7, 2, 8, this.emptyGame)).should.throw();

		(() => this.blackBishop.isCellAccessible(7, 8, 7, 7, this.emptyGame)).should.throw();
		(() => this.blackBishop.isCellAccessible(1, 8, 1, 7, this.emptyGame)).should.throw()
	}

	specialCaseTest () { }

	movingToAnotherPiece () {
		let whitePieces = new Map([[this.whiteBishop, [[7, 7]]]])
		let blackPieces = new Map([[this.blackBishop, [[4, 4]]]])
		let game = getGameWithConfiguration(whitePieces, blackPieces)

		this.whiteBishop.isCellAccessible(7, 7, 5, 5, game).should.be.true
		this.whiteBishop.isCellAccessible(7, 7, 0, 0, game).should.be.false
	}

}