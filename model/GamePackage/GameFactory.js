/**
 * Created by thareau on 28/05/17.
 */

import {assertInstanceOf, assertTrue} from '../../util/general';
import {Player} from './GameImplementation/Player';
import {Game} from './GameImplementation/Game';
import {GameConstructionError} from './errors/GameErrors';

let gameClass = Game;
let playerClass = Player;

let users = [];

let addPlayer = function (user) {
	//assertInstanceOf(user, User)
	users.push(user);
	return users.length > 1;
};

let createGame = function () {

	if(users.length < 2)
		throw new GameConstructionError("Not enough player to start game");
	let player0 = new playerClass(users.pop());
	let player1 = new playerClass(users.pop());
	let game = new gameClass(player0, player1);
	game.save();

	return game;
};

let clear = function () {
	users = [];
};

export {addPlayer, createGame, clear};