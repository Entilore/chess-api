/**
 * Created by thareau on 09/06/17.
 */
import { IRound } from '../IRound'
export class Round extends IRound {
	constructor (game, actor, moved, captured = undefined, impliedMove = undefined, previous = undefined) {
		super(game, moved, captured, impliedMove, previous)
		this.game = game
		this.actor = actor
		this.moved = moved
		this.captured = captured
		this.impliedMove = impliedMove
		this._previous = previous
		this._applied = false
	}

	get previous () {return this._previous}

	set previous (value) {
		if (this._previous) throw new Error('the previous state is not supposed to be reset')
		this._previous = value
	}

	get applied () {return this._applied}

	apply () {
		if (this.applied) throw new Error('This round was already applied')
		for (let mov of [this.moved, this.impliedMove]) {
			if (mov) {
				let [xFrom, yFrom, xTo, yTo, piece] = mov
				let movedPiece = this.game.move(xFrom, yFrom, xTo, yTo)
				if (piece !== movedPiece) throw new Error('Not the same piece')
			}
		}
		if (this.captured) {
			let [x, y, piece] = this.captured
			let capturedPiece = this.game.capture(x, y)
			if (capturedPiece !== piece) throw new Error('Not the same piece')
		}
		if (this.game.isChess(this.actor)) {
			this.revert()
			throw new Error(`Impossible move: ${this.actor} would be chess`)
		}
		this._applied = true
		this.previous = this.game.state
		this.game.state = this
	}

	revert () {
		if (!this.applied) {
			if (this.previous) throw new Error('Cannot revert a non applied round')
		} else {
			if (this.game.state !== this)throw new Error('Cannot revert a non current round')
		}

		for (let mov of [this.moved, this.impliedMove]) {
			if (mov) {
				let [xFrom, yFrom, xTo, yTo, piece] = mov
				let movedPiece = this.game.move(xTo, yTo, xFrom, yFrom)
				if (piece !== movedPiece) throw new Error('Not the same piece')
			}
		}
		if (this.captured) {
			let [x, y, piece] = this.captured
			let capturedPiece = this.game.uncapture(x, y, piece)
			if (capturedPiece !== piece) throw new Error('Not the same piece')
		}

		this._applied = false
		this.game.state = this.previous

	}
}