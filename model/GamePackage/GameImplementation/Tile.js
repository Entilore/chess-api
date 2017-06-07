/**
 * Created by thareau on 06/06/17.
 */
export class Tile {
	static _firstDirection (iFrom, iTo) {
		if (iFrom < iTo)
			return iFrom + 1
		else if (iFrom > iTo)
			return iFrom - 1
		return iFrom
	}

	static firstTileInDirectionOf (xFrom, yFrom, xTo, yTo) {
		return [Tile._firstDirection(xFrom, xTo),Tile._firstDirection(yFrom, yTo)]
	}

	/**
	 * generate every tiles between From and To, both excluded
	 * @param xFrom the X of From
	 * @param yFrom the Y of From
	 * @param xTo the X of To
	 * @param yTo the Y of To
	 * @yield a cell between From and To
	 */
	static * getTilesBetween (xFrom, yFrom, xTo, yTo) {
		let [tmpX, tmpY] = [xFrom, yFrom]
		while (tmpX !== xTo && tmpY !== yTo) {
			yield [tmpX, tmpY];
			[tmpX, tmpY] = Tile.firstTileInDirectionOf(tmpX, tmpY, xTo, yTo)
		}
		yield [tmpX, tmpY]
	}
}