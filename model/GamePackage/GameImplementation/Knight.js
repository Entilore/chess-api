/**
 * Created by thareau on 28/05/17.
 */

import {isInMap} from '../../../util/general';
let instance;

class Knight extends IPiece {
	constructor() {
		if (instance) return instance;
		super();

		this.pathes = {};
		instance = this;
	};

	getAccessibleCells(x, y) {
		if(this.pathes[[x,y]])return this.pathes[x,y];

		super.getAccessibleCells(x, y);

		let cells = [];

		for (let [i, j] of [
			[x - 2, y - 1],
			[x + 2, y - 1],
			[x - 2, y + 1],
			[x + 2, y + 1],
			[x - 1, y - 2],
			[x - 1, y + 2],
			[x + 1, y - 2],
			[x + 1, y + 2],
		]) {
			if (isInMap(i, j))
				cells.push([i, j]);
		}

		this.pathes[x,y] = cells;
		return cells;
	}

}