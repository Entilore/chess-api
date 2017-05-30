/**
 * Created by thareau on 29/05/17.
 */
import {IGame} from '../IGame';
import {IPlayer} from '../IPlayer';
class Game extends IGame {
	constructor(player1, player2){
		if(Math.random()>0.5) super(player1, player2);
		else super(player2, player1);

		// add the pieces to the players
		this.whitePlayer.setupPieces(true);
		this.blackPlayer.setupPieces(false);
	}
}