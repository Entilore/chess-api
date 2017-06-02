import {describe, it} from 'mocha';
import {PawnTest} from './Pawn.spec';

let chai = require('chai');
chai.should();

describe('The pieces functions', function () {
	let pieces = [new PawnTest()];
	for (let testObj of pieces) {
		describe(testObj.testedPiece, function () {
			describe('isCellAccessible', function () {
				it('should return true if the cell is accessible', function () {
					testObj.cellIsAccessibleTest();
				});

				it('should return false if the cell is not accessible', function () {
					testObj.cellIsNotAccessibleTest();
				});

				testObj.specialCaseTest();

				it('should accept to move to an adversary piece', function () {
					testObj.movingToAnotherPiece();
				});
			});
		});
	}
});
