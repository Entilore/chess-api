/**
 * Created by thareau on 30/05/17.
 */
let adjacentDistance = function (x1, y1, x2, y2) {
	return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
};

let manhattanDistance = function (x1, y1, x2, y2) {
	return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

export {adjacentDistance, manhattanDistance};