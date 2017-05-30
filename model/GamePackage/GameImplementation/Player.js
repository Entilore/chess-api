/**
 * Created by thareau on 29/05/17.
 */
import {IPlayer} from '../IPlayer';
import {Pawn} from './Pawn';
import {Rook} from './Rook';
import {Knight} from './Knight';
import {Bishop} from './Bishop';
import {King} from './King';
import {Queen} from './Queen';


export class Player extends IPlayer {
	constructor(user) {
		super(user);
		this.user = user;
		this.color = null;
		this.pieces = {}
	}

	setupPieces(isWhite) {
		let pawnsLine = 6;
		let figureLine = 7;
		if (isWhite) {
			pawnsLine = 1;
			figureLine = 0;
		}

		//add pawns first (because easier)
		for (let i = 0; i < 8; i++) {
			this.pieces[[i, pawnsLine]] = new Pawn();
		}

		// then Rook, Knight and Bishop => Roknibi
		let roknibi = [() => new Rook(), () => new Knight(), () => new Bishop()];

		for (let i = 0; i < roknibi.length; i++) {
			this.pieces[[i, figureLine]] = roknibi[i]();
			this.pieces[[7 - i, figureLine]] = roknibi[i]();
		}

		this.pieces[[3, figureLine]] = new Queen();
		this.pieces[[4, figureLine]] = new King();
	}

	getPiece(x, y){
		return this.pieces[[x,y]];
	}
}