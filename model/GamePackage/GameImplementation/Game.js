/**
 * Created by thareau on 29/05/17.
 */
import {IGame} from '../IGame';
import {IPlayer} from '../IPlayer';
export class Game extends IGame {
	constructor(player1, player2) {
		if (Math.random() > 0.5) super(player1, player2);
		else super(player2, player1);

		this._map = [[], this.state];
		// add the pieces to the players
		this.whitePlayer.setupPieces(true);
		this.blackPlayer.setupPieces(false);
	}
	getContent(x, y) {
		let map = this.map();
		if (map[x] && map[x][y]) return map[x][y];
		return null;
	}

	map() {
		// load saved map, if state !=, rebuild
		// if the state does not exists, rebuild map
		let [map, state] = this._map;
		if (this.state && this.state === state) return map;

		map = [];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let piece = this.whitePlayer.getPiece(i, j) || this.blackPlayer.getPiece(i, j);
				if (piece) {
					if (!map[i]) map[i] = [];
					map[i][j] = piece;
				}
			}
		}
		this._map = [map, this.state]
		return map;
	}
}

