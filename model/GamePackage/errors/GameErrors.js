/**
 * Created by thareau on 01/06/17.
 */

class GameConstructionError extends Error {
	constructor(message) {
		super(message);
		this.message = message;
		this.name = 'GameConstructionError';
	}
}

class NotOnBoardError extends Error {
	constructor(x, y) {
		let message = `The cell (${x}, ${y}) is not on the board`;
		super(message);
		this.message = message;
		this.name = 'NotOnBoardError';
	}
}

class MoveError extends  Error{
	constructor(message) {
		super(message);
		this.message = message;
		this.name = 'MoveError';
	}
}
export {GameConstructionError, NotOnBoardError, MoveError};