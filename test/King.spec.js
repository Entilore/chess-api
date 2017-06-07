/**
 * Created by thareau on 01/06/17.
 */

import { getEmptyGame, getGameWithConfiguration } from './testUtility.spec'
import { it } from 'mocha'
import { PieceFactory } from '../model/GamePackage/GameImplementation/Piece/Piece'
import { King } from '../model/GamePackage/GameImplementation/Piece/King'
import { Pawn } from '../model/GamePackage/GameImplementation/Piece/Pawn'
import { Rook } from '../model/GamePackage/GameImplementation/Piece/Rook'
let pf = PieceFactory.getInstance()

export class KingTest {
	constructor () {
		this.whiteKing = pf.getInstance(King, true)
		this.blackKing = pf.getInstance(King, false)
		this.emptyGame = getEmptyGame()
		this.testedPiece = 'King'
	}

	cellIsAccessibleTest () {
		this.whiteKing.isCellAccessible(0, 0, 0, 1, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(0, 0, 1, 1, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(0, 0, 1, 0, this.emptyGame).should.be.true

		this.whiteKing.isCellAccessible(5, 5, 4, 4, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(5, 5, 4, 5, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(5, 5, 4, 6, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(5, 5, 6, 4, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(5, 5, 6, 5, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(5, 5, 6, 6, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(5, 5, 5, 4, this.emptyGame).should.be.true
		this.whiteKing.isCellAccessible(5, 5, 5, 6, this.emptyGame).should.be.true

		this.blackKing.isCellAccessible(5, 5, 4, 4, this.emptyGame).should.be.true
		this.blackKing.isCellAccessible(5, 5, 4, 5, this.emptyGame).should.be.true
		this.blackKing.isCellAccessible(5, 5, 4, 6, this.emptyGame).should.be.true
		this.blackKing.isCellAccessible(5, 5, 6, 4, this.emptyGame).should.be.true
		this.blackKing.isCellAccessible(5, 5, 6, 5, this.emptyGame).should.be.true
		this.blackKing.isCellAccessible(5, 5, 6, 6, this.emptyGame).should.be.true
		this.blackKing.isCellAccessible(5, 5, 5, 4, this.emptyGame).should.be.true
		this.blackKing.isCellAccessible(5, 5, 5, 6, this.emptyGame).should.be.true
	}

	cellIsNotAccessibleTest () {
		this.whiteKing.isCellAccessible(0, 0, 0, 2, this.emptyGame).should.be.false
		this.whiteKing.isCellAccessible(0, 0, 2, 2, this.emptyGame).should.be.false
		this.whiteKing.isCellAccessible(0, 0, 0, 0, this.emptyGame).should.be.false
	}

	cellIsOutOfTheBoard () {
		(() => this.blackKing.isCellAccessible(7, 7, 7, 8, this.emptyGame)).should.throw();
		(() => this.blackKing.isCellAccessible(1, 7, 1, 8, this.emptyGame)).should.throw();

		(() => this.blackKing.isCellAccessible(7, 8, 7, 7, this.emptyGame)).should.throw();
		(() => this.blackKing.isCellAccessible(1, 8, 1, 7, this.emptyGame)).should.throw()
	}

	specialCaseTest () {
		let whiteKingPosition = this.whiteKing.getInitialPosition().next().value
		let [xWhiteKing, yWhiteKing] = whiteKingPosition

		let blackKingPosition = this.blackKing.getInitialPosition().next().value
		let [xBlackKing, yBlackKing] = blackKingPosition

		let whitePieces = new Map([
			[this.whiteKing, [whiteKingPosition]],
			[pf.getInstance(Rook, true), [...pf.getInstance(Rook, true).getInitialPosition()]],
		])

		let blackPieces = new Map([
			[this.blackKing, [...this.blackKing.getInitialPosition()]],
			[pf.getInstance(Rook, false), [...pf.getInstance(Rook, false).getInitialPosition()]],
		])
		let game = getGameWithConfiguration(whitePieces, blackPieces)
		let self = this
		it('should accept to do a castling if it is possible', function () {
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing - 2, yWhiteKing, game).should.be.true
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing + 2, yWhiteKing, game).should.be.true
			self.blackKing.isCellAccessible(xBlackKing, yBlackKing, xBlackKing - 2, yBlackKing, game).should.be.true
			self.blackKing.isCellAccessible(xBlackKing, yBlackKing, xBlackKing + 2, yBlackKing, game).should.be.true
		})

		it('should not accept to do a castling if it is not on the right tile', function () {
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing - 3, yWhiteKing, game).should.be.false
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing + 3, yWhiteKing, game).should.be.false

			self.blackKing.isCellAccessible(xBlackKing, yBlackKing, xBlackKing + 3, yBlackKing, game).should.be.false
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing + 3, yWhiteKing, game).should.be.false
			self.blackKing.isCellAccessible(xBlackKing, yBlackKing, xBlackKing + 3, yBlackKing, game).should.be.false

			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing + 3, yWhiteKing + 1, game).should.be.false
		})

		it('should not accept to do a castling is a piece is between the rook and the king', function () {
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing + 2, yWhiteKing, game).should.be.true
			game.whitePlayer.pieces[[xWhiteKing + 2, yWhiteKing]] = pf.getInstance(Pawn, true)
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing + 2, yWhiteKing, game).should.be.false
			game.whitePlayer.pieces[[xWhiteKing - 3, yWhiteKing]] = pf.getInstance(Pawn, true)
			self.whiteKing.isCellAccessible(xWhiteKing, yWhiteKing, xWhiteKing - 2, yWhiteKing, game).should.be.false
		})

		it('should not accept to do a castling if one of the pieces has moved', function () {
			// not yet implemented
		})
	}

	movingToAnotherPiece () {
		let whitePieces = new Map([
			[this.whiteKing, [[1, 1]]],
		])
		let blackPieces = new Map([
			[this.blackKing, [[5, 5]]],
			[pf.getInstance(Pawn, false), [[2, 2]]],
		])
		let game = getGameWithConfiguration(whitePieces, blackPieces)

		this.whiteKing.isCellAccessible(1, 1, 2, 2, game).should.be.true
	}

}