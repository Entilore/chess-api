/**
 * Created by thareau on 06/06/17.
 */
import { isInMap } from '../../../util/general'
export class Tile {
	static _firstDirection (iFrom, iTo) {
		if (iFrom < iTo)
			return iFrom + 1
		else if (iFrom > iTo)
			return iFrom - 1
		return iFrom
	}

	static firstTileInDirectionOf (xFrom, yFrom, xTo, yTo) {
		return [Tile._firstDirection(xFrom, xTo), Tile._firstDirection(yFrom, yTo)]
	}

	static * getTilesInDirection (x, y, xIncrement = 0, yIncrement = 0) {
		if (xIncrement === 0 && yIncrement === 0)
			throw new Error('Infinite loop...')

		yield* Tile._generateTilePath(x, y, (i, j) => {
			return [i + xIncrement, j + yIncrement]
		})
	}

	static * _generateTilePath (x, y, gen) {
		let i = x
		let j = y

		while (isInMap(i, j)) {
			[i, j] = gen(i, j)
			yield [i, j]
		}

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
		while (tmpX !== xTo || tmpY !== yTo) {
			yield [tmpX, tmpY];
			[tmpX, tmpY] = Tile.firstTileInDirectionOf(tmpX, tmpY, xTo, yTo)
		}
		yield [tmpX, tmpY]
	}
}