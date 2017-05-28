import * as assert from 'assert';

let assertInstanceOf = function (obj, clazz) {
	let isInstanceOf = true;
	if (typeof(obj) !== 'object') {
		isInstanceOf = (!obj instanceof clazz);
	} else {
		isInstanceOf = typeof(obj) === clazz.name.toLowerCase();
	}

	if (!isInstanceOf) throw new TypeError(`${obj.toString()} is not an instance of ${clazz.name}`);
};

let assertTrue = function (condition) {
	assert(condition);
};

let isInMap = function(i, j = -1){
	if (j!== -1) return isInMap(i) && isInMap(j);
	return i >= 0 && i < 8;
};

export {assertInstanceOf, assertTrue, isInMap};