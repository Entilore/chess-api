/**
 * Created by thareau on 01/06/17.
 */

import {getEmptyGame, getGameWithConfiguration} from './testUtility.spec';
import {Pawn} from '../model/GamePackage/GameImplementation/Pawn';
import {it} from 'mocha';
import {PieceFactory} from '../model/GamePackage/GameImplementation/Piece';
let pf = PieceFactory.getInstance();

export class PawnTest {
	constructor() {
		this.whitePawn = pf.getInstance(Pawn, true);
		this.blackPawn = pf.getInstance(Pawn, false);
		this.emptyGame = getEmptyGame();
		this.testedPiece = 'Pawn';
	}

	cellIsAccessibleTest() {
		this.whitePawn.isCellAccessible(0, 0, 0, 1, this.emptyGame).should.be.true;
		this.whitePawn.isCellAccessible(7, 6, 7, 7, this.emptyGame).should.be.true;
		this.whitePawn.isCellAccessible(5, 2, 5, 3, this.emptyGame).should.be.true;

		this.blackPawn.isCellAccessible(0, 7, 0, 6, this.emptyGame).should.be.true;
		this.blackPawn.isCellAccessible(0, 1, 0, 0, this.emptyGame).should.be.true;
		this.blackPawn.isCellAccessible(5, 2, 5, 1, this.emptyGame).should.be.true;
	}

	cellIsNotAccessibleTest() {
		this.whitePawn.isCellAccessible(0, 0, 1, 1, this.emptyGame).should.be.false;
		this.whitePawn.isCellAccessible(0, 1, 0, 1, this.emptyGame).should.be.false;
		this.whitePawn.isCellAccessible(0, 1, 0, 0, this.emptyGame).should.be.false;

		this.blackPawn.isCellAccessible(0, 0, 0, 1, this.emptyGame).should.be.false;
		this.blackPawn.isCellAccessible(5, 2, 0, 0, this.emptyGame).should.be.false;
	}

	cellIsOutOfTheBoard(){
		(() => this.whitePawn.isCellAccessible(7, 7, 7, 8, this.emptyGame)).should.throw();
		(() => this.whitePawn.isCellAccessible(1, 7, 1, 8, this.emptyGame)).should.throw();

		(() => this.blackPawn.isCellAccessible(7, 8, 7, 7, this.emptyGame)).should.throw();
		(() => this.blackPawn.isCellAccessible(1, 8, 1, 7, this.emptyGame)).should.throw();
	}

	specialCaseTest() {
		let self = this;
		it('should accept the first double move forward', function () {
			for (let i = 0; i < 8; i++) {
				self.whitePawn.isCellAccessible(i, 1, i, 3, self.emptyGame).should.be.true;
				self.blackPawn.isCellAccessible(i, 6, i, 4, self.emptyGame).should.be.true;
			}

			self.whitePawn.isCellAccessible(2, 1, 2, 4, self.emptyGame).should.be.false;
			self.blackPawn.isCellAccessible(2, 5, 2, 3, self.emptyGame).should.be.false;

		});

	}

	movingToAnotherPiece() {
		let whitePieces = new Map([[this.whitePawn, [[1, 1]]]]);
		let blackPieces = new Map([[this.blackPawn, [[0, 2], [1, 2]]]]);
		let game = getGameWithConfiguration(whitePieces, blackPieces);

		this.whitePawn.isCellAccessible(1, 1, 0, 2, game).should.be.true;
		this.whitePawn.isCellAccessible(1, 1, 3, 2, game).should.be.false;
		this.whitePawn.isCellAccessible(1, 1, 1, 2, game).should.be.false;
	}

}