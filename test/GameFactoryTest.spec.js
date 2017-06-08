/**
 * Created by thareau on 01/06/17.
 */
import { after, describe, it } from 'mocha'
import * as GameFactory from '../model/GamePackage/GameFactory'
import { IGame } from '../model/GamePackage/IGame'

let chai = require('chai')
chai.should()

after(function () {
	GameFactory.clear()
})

describe('The game factory', function () {
	it('should create a game if two players were given', function () {
		GameFactory.addPlayer('1')
		GameFactory.addPlayer('2')
		GameFactory.createGame().should.be.an.instanceof(IGame)
	})
	it('should fails if not enough player were given', function () {
		GameFactory.addPlayer('1').should.be.false
		let g = null;
		(() => GameFactory.createGame()).should.throw()
		GameFactory.addPlayer('2').should.be.true;
		(() => g = GameFactory.createGame()).should.not.throw()
		g.should.be.an.instanceof(IGame)
		GameFactory.addPlayer('3').should.be.false;
		(() => GameFactory.createGame()).should.throw()
		GameFactory.addPlayer('4').should.be.true
		GameFactory.createGame().should.be.an.instanceof(IGame)
	})
	it('should create two games if four players were given', function () {
		GameFactory.addPlayer('1').should.be.false
		GameFactory.addPlayer('2').should.be.true
		GameFactory.addPlayer('3').should.be.true
		GameFactory.addPlayer('4').should.be.true
		GameFactory.createGame().should.be.an.instanceof(IGame)
		GameFactory.createGame().should.be.an.instanceof(IGame);
		(() => GameFactory.createGame()).should.throw()
	})

})