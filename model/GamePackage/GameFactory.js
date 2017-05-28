/**
 * Created by thareau on 28/05/17.
 */

import {assertInstanceOf, assertTrue} from '../../util/general';

let gameClass = null;
let playerClass = null;

let users = [];

let addPlayer = function (user) {
	//assertInstanceOf(user, User)
	assertTrue(users.length < 3);
	users.push(user);
	return users.length === 2;
};

let createGame = function () {
	let player0 = new playerClass(users[0]);
	let player1 = new playerClass(users[1]);
	let game = new gameClass(player0, player1);
	game.save();

	users = [];
	return game;
};

export {addPlayer, createGame};