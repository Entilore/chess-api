/**
 * Created by thareau on 28/05/17.
 */

import {Piece} from './Piece';
let instance;

export class Rook extends Piece {
	constructor(isWhite) {
		super(isWhite);

		this.pathes = {};
	}

	* getInitialPosition(){
		yield [0, this._figureLine];
		yield [7, this._figureLine];
	}

	isCellAccessible(xFrom, yFrom, xTo, yTo){
		// either same column, either same line, but not both
		return (xFrom === xTo) !== (yFrom === yTo);
	}

	getAccessibleCells(x, y) {
		if (this.pathes[[x, y]])
			return this.pathes[[x, y]];

		super.getAccessibleCells(x, y);
		let cells = [];

		for (let i = 0; i < 8; i ++){
			cells.push([i,y]);
			cells.push([x,i]);
		}

		this.pathes[[x, y]] = cells;
		return cells;
	}
}