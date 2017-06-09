/**
 * Created by thareau on 09/06/17.
 */
import { IRoundFactory } from '../IRoundFactory'

const roundClass = Round

export class RoundFactory extends IRoundFactory {
	constructor () {
		super()

	}

	setMoved(xFrom, yFrom, xTo, yTo){
		super.setMoved(xFrom, yFrom, xTo, yTo)
		this.moved = [xFrom, yFrom, xTo, yTo]
	}

	setGame(game){
		super.setGame(game)
		this.game = game
	}

	build(){
		if(!this.moved || !this.game){
			return null
			// todo raise exception
		}
		let [xFrom, yFrom, xTo, yTo] = this.moved
		let fromPiece = this.game.getPiece(xFrom, yFrom)
		let toPiece = this.game.getPiece(xTo, yTo)
		let otherMovedPieceImplied = fromPiece.otherMovedPieceImplied(xFrom, yFrom, xTo, yTo)
		let actor = this.game.getPlayer(fromPiece.isWhite)

		let fromMovement = [xFrom, yFrom, xTo, yTo, fromPiece]
		let toMovement
		if(toPiece)
			toMovement = [xTo, yTo, toPiece]

		return new roundClass(this.game, actor, fromMovement, toMovement, otherMovedPieceImplied)
	}
}