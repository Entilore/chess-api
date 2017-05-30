/**
 * Created by thareau on 28/05/17.
 */

import {IPlayer} from './IPlayer';
import {assertInstanceOf} from '../../util/general';
export class IGame {
	constructor(player1, player2) {
		assertInstanceOf(player1, IPlayer);
		assertInstanceOf(player2, IPlayer);
		this.whitePlayer = player1;
		this.blackPlayer = player2;
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


	retrievePiece(x, y) {
		assertInstanceOf(x, Number);
		assertInstanceOf(y, Number);
	}

	setState(state) {
		assertInstanceOf(state, IRound);
	}

	rollback(n) {
		assertInstanceOf(n, Number);
	}
}




