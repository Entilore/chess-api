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
import {PieceFactory} from './Piece';


export class Player extends IPlayer {
	constructor(user) {
		super(user);
		this.user = user;
		this.color = null;
		this.pieces = {}
	}

	setupPieces(isWhite) {
		const pf = new PieceFactory();
		let pawnsLine = 6;
		let figureLine = 7;
		if (isWhite) {
			pawnsLine = 1;
			figureLine = 0;
		}

		//add pawns first (because easier)
		for (let i = 0; i < 8; i++) {
			this.pieces[[i, pawnsLine]] = pf.getInstance(Pawn, isWhite);
		}

		// then Rook, Knight and Bishop => Roknibi
		let roknibi = [() => pf.getInstance(Rook, isWhite), () => pf.getInstance(Knight, isWhite), () => pf.getInstance(Bishop, isWhite)];

		for (let i = 0; i < roknibi.length; i++) {
			this.pieces[[i, figureLine]] = roknibi[i]();
			this.pieces[[7 - i, figureLine]] = roknibi[i]();
		}

		this.pieces[[3, figureLine]] = pf.getInstance(Queen, isWhite);
		this.pieces[[4, figureLine]] = pf.getInstance(King, isWhite);
	}

	getPiece(x, y){
		return this.pieces[[x,y]];
	}
}