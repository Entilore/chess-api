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
}