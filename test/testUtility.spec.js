/**
 * Created by thareau on 01/06/17.
 */
import {Player} from '../model/GamePackage/GameImplementation/Player';
import {Game} from '../model/GamePackage/GameImplementation/Game';

let getEmptyGame = function(){
	let p1 = new Player();
	let p2 = new Player();
	let game = new Game(p1, p2);

	p1.pieces = {};
	p2.pieces = {};
	return game;
};

let getGameWithConfiguration = function(white, black){
	let game = getEmptyGame();
	for (let [piece, positions] of white){
		for(let pos of positions)
			game.whitePlayer.pieces[pos] = piece;
	}
	for (let [piece, positions] of black){
		for(let pos of positions)
			game.blackPlayer.pieces[pos] = piece;
	}

	return game;
};


export {getEmptyGame, getGameWithConfiguration};