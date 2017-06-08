/**
 * Created by thareau on 07/06/17.
 */
import { describe, it } from 'mocha'
import { getGameWithConfiguration } from './testUtility.spec'
import { PieceFactory } from '../model/GamePackage/GameImplementation/Piece/Piece'
import { Pawn } from '../model/GamePackage/GameImplementation/Piece/Pawn'
import { Queen } from '../model/GamePackage/GameImplementation/Piece/Queen'
import { Knight } from '../model/GamePackage/GameImplementation/Piece/Knight'
import { Rook } from '../model/GamePackage/GameImplementation/Piece/Rook'
import { Bishop } from '../model/GamePackage/GameImplementation/Piece/Bishop'
import { King } from '../model/GamePackage/GameImplementation/Piece/King'

let chai = require('chai')
chai.should()

let pf = PieceFactory.getInstance()
let whitePieces = new Map([
	[pf.createPiece(Pawn, true), [[1, 2], [4, 1]]]],
)
let blackPieces = new Map([
	[pf.createPiece(Pawn, false), [[2, 4]]],
	[pf.createPiece(Queen, false), [[3, 6]]],
	[pf.createPiece(Knight, false), [[3, 5]]],
	[pf.createPiece(Bishop, false), [[3, 4]]],
	[pf.createPiece(Rook, false), [[4, 4]]],
	[pf.createPiece(King, false), [[6, 3]]],
])

let game = getGameWithConfiguration(whitePieces, blackPieces)

describe('The game classes', () => {
	describe('isUnderAttack function', () => {
		it('should detect a pawn attack:', () => {
			game.isUnderAttack(1, 3, false).should.be.true
			game.isUnderAttack(3, 3, false).should.be.true
		})
		it('should detect a Knight attack:', () => {
			game.isUnderAttack(1, 4, false).should.be.true
			game.isUnderAttack(1, 6, false).should.be.true
			game.isUnderAttack(2, 3, false).should.be.true
			game.isUnderAttack(2, 7, false).should.be.true
			game.isUnderAttack(4, 3, false).should.be.true
			game.isUnderAttack(4, 7, false).should.be.true
			game.isUnderAttack(5, 4, false).should.be.true
			game.isUnderAttack(5, 6, false).should.be.true
		})

		it('should detect a King attack:', () => {
			game.isUnderAttack(5, 2, false).should.be.true
			game.isUnderAttack(5, 3, false).should.be.true
			game.isUnderAttack(5, 4, false).should.be.true
			game.isUnderAttack(6, 2, false).should.be.true
			game.isUnderAttack(6, 4, false).should.be.true
			game.isUnderAttack(7, 2, false).should.be.true
			game.isUnderAttack(7, 3, false).should.be.true
			game.isUnderAttack(7, 4, false).should.be.true
		})
		it('should detect a rook attack:', () => {
			game.isUnderAttack(4, 1, false).should.be.true
			game.isUnderAttack(4, 2, false).should.be.true
			game.isUnderAttack(4, 3, false).should.be.true
			game.isUnderAttack(4, 5, false).should.be.true
			game.isUnderAttack(4, 6, false).should.be.true
			game.isUnderAttack(4, 7, false).should.be.true
		})
		it('should detect a queen attack (with rook behaviour):', () => {
			game.isUnderAttack(0, 6, false).should.be.true
			game.isUnderAttack(2, 6, false).should.be.true
			game.isUnderAttack(5, 6, false).should.be.true
			game.isUnderAttack(6, 6, false).should.be.true
			game.isUnderAttack(7, 6, false).should.be.true
			game.isUnderAttack(3, 7, false).should.be.true
		})
		it('should detect a bishop attack:', () => {
			game.isUnderAttack(1, 2, false).should.be.true
			game.isUnderAttack(6, 1, false).should.be.true
			game.isUnderAttack(7, 0, false).should.be.true
			game.isUnderAttack(2, 5, false).should.be.true
			game.isUnderAttack(0, 7, false).should.be.true
			game.isUnderAttack(6, 7, false).should.be.true
		})
		it('should detect a queen attack (with bishop behaviour):', () => {
			game.isUnderAttack(0, 3, false).should.be.true
			game.isUnderAttack(1, 4, false).should.be.true
		})

		it('should not detect an attack by an adversary piece', () => {
			// white pawn in 4/1 attacks 3/2
			game.isUnderAttack(3, 2, false).should.be.false
			game.isUnderAttack(3, 2, true).should.be.true
		})
		it('should not detect an attack hidden by an adversary piece', () => {
			// bishop, hidden by pawn in 1/2
			game.isUnderAttack(0, 1, false).should.be.false

			// rook, hidden by pawn in 4/2
			game.isUnderAttack(4, 0, false).should.be.false
		})
		it('should not detect an attack hidden by an local piece', () => {
			// rook, hidden by pawn & bishop on line 4
			game.isUnderAttack(0, 4, false).should.be.false

			// queen, hidden by knight & bishop on column 3
			game.isUnderAttack(3, 0, false).should.be.false
			game.isUnderAttack(3, 1, false).should.be.false
			game.isUnderAttack(3, 2, false).should.be.false
		})

	})
})