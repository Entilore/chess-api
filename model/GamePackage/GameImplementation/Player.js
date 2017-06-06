/**
 * Created by thareau on 29/05/17.
 */
import { IPlayer } from '../IPlayer'
import { Pawn } from './Pawn'
import { Rook } from './Rook'
import { Knight } from './Knight'
import { Bishop } from './Bishop'
import { King } from './King'
import { Queen } from './Queen'
import { PieceFactory } from './Piece'
import { Game } from './Game'

export class Player extends IPlayer {
  constructor (user, isWhite) {
    super(user)
    this.user = user
    this.pieces = {}
    this._kingSideCastlingIsPossible = true
    this._queenSideCastlingIsPossible = true
    this._isWhite = isWhite
  }

  get isWhite () {return this._isWhite}

  set isWhite (value) {
    if (this._isWhite !== undefined && value !== this._isWhite)
      throw new Error('trying to redefine isWhite')
    this._isWhite = value
  }

  get figureLine () {
    if (this.isWhite)
      return 0
    return 7
  }

  get pawnLine () {
    if (this.isWhite)
      return 1
    return 6
  }

  setupPieces (isWhite) {
    if (isWhite !== undefined)
      this.isWhite = isWhite
    else
      isWhite = this.isWhite

    let figureLine = this.figureLine
    let pawnsLine = this.pawnLine
    const pf = new PieceFactory()

    //add pawns first (because easier)
    for (let i = 0; i < 8; i++) {
      this.pieces[[i, pawnsLine]] = pf.getInstance(Pawn, isWhite)
    }

    // then Rook, Knight and Bishop => Roknibi
    let roknibi = [() => pf.getInstance(Rook, isWhite), () => pf.getInstance(Knight, isWhite), () => pf.getInstance(Bishop, isWhite)]

    for (let i = 0; i < roknibi.length; i++) {
      this.pieces[[i, figureLine]] = roknibi[i]()
      this.pieces[[7 - i, figureLine]] = roknibi[i]()
    }

    this.pieces[[3, figureLine]] = pf.getInstance(Queen, isWhite)
    this.pieces[[4, figureLine]] = pf.getInstance(King, isWhite)
  }

  getPiece (x, y) {
    return this.pieces[[x, y]]
  }

  get queenSideCastlingIsPossible () {return this._queenSideCastlingIsPossible}

  get kingSideCastlingIsPossible () {return this._kingSideCastlingIsPossible}

  get availableCastling () {
    let castling = []
    if (this.queenSideCastlingIsPossible) castling.push(Game.QUEEN_SIDE_CASTLING)
    if (this.kingSideCastlingIsPossible) castling.push(Game.KING_SIDE_CASTLING)
    return castling
  }

}