/**
 * Created by thareau on 28/05/17.
 */

import {IPlayer} from './IPlayer';
export class IGame {
	constructor(player1, player2) {
		assertInstanceOf(player1, IPlayer);
		assertInstanceOf(player2, IPlayer);
		this.player1 = player1;
		this.player2 = player2;
		this.rounds = [];
		this.state = null;
	};

	save() {};

	getPossibleMoves(x, y) {
		assertInstanceOf(x, Number);
		assertInstanceOf(y, Number);
	};

	move(originX, originY, destinationX, destinationY) {
		assertInstanceOf(originX, Number);
		assertInstanceOf(originY, Number);
		assertInstanceOf(destinationX, Number);
		assertInstanceOf(destinationY, Number);
	};

	undo(n) {
		assertInstanceOf(n, Number)
	};

	redo(n) {
		assertInstanceOf(n, Number)
	};
}




