/**
 * Created by thareau on 01/06/17.
 */

class GameConstructionError extends Error {
	constructor(message) {
		super(message);
		this.message = message;
		this.name = 'GameConstructionError ';
	}
}

export {GameConstructionError};