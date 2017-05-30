import {describe, it} from 'mocha';
import {Pawn} from '../model/GamePackage/GameImplementation/Pawn';

let chai = require('chai');
chai.should();

describe('The pieces functions', function () {
	let whitePawn = new Pawn(true);
	let blackPawn = new Pawn(false);
	describe('Pawn', function () {
		describe('isCellAccessible', function () {
			it('should return true if the cell is accessible', function () {
				whitePawn.isCellAccessible(0, 0, 0, 1).should.be.true;
				whitePawn.isCellAccessible(7, 6, 7, 7).should.be.true;
				whitePawn.isCellAccessible(5, 2, 5, 3).should.be.true;

				blackPawn.isCellAccessible(0, 7, 0, 6).should.be.true;
				blackPawn.isCellAccessible(0, 1, 0, 0).should.be.true;
				blackPawn.isCellAccessible(5, 2, 5, 1).should.be.true;
			});

			it('should return false if the cell is not accessible', function () {
				whitePawn.isCellAccessible(0, 0, 1, 1).should.be.false;
				whitePawn.isCellAccessible(0, 1, 0, 1).should.be.false;
				whitePawn.isCellAccessible(0, 1, 0, 0).should.be.false;

				blackPawn.isCellAccessible(0, 0, 0, 1).should.be.false;
				blackPawn.isCellAccessible(5, 2, 0, 0).should.be.false;
			});

			it('should accept the first double move forward', function () {
				for (let i = 0; i < 8; i++) {
					whitePawn.isCellAccessible(i, 1, i, 3);
					blackPawn.isCellAccessible(i, 6, i, 4);
				}
			});
		});
	});
});
