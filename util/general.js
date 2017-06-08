import { NotOnBoardError } from '../model/GamePackage/errors/GameErrors'
let assertInstanceOf = function (obj, clazz) {
	let isInstanceOf = true
	if (typeof(obj) === 'object') {
		isInstanceOf = (obj instanceof clazz)
	} else {
		isInstanceOf = typeof(obj) === clazz.name.toLowerCase()
	}

	if (!isInstanceOf) throw new TypeError(`${obj.toString()} is not an instance of ${clazz.name}`)
}

let assertIsTile = function (x, y) {
	assertInstanceOf(x, Number)
	assertInstanceOf(y, Number)
	if (!isInMap(x, y)) throw new NotOnBoardError(x, y)

}
let assertTrue = function (condition, message = 'Failure') {
	if (!condition) throw new Error(message)
}

let isInMap = function (i, j = undefined) {
	if (j !== undefined) return isInMap(i) && isInMap(j)
	return i >= 0 && i < 8
}

export { assertInstanceOf, assertTrue, isInMap, assertIsTile }