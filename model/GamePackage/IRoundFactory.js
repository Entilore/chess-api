/**
 * Created by thareau on 28/05/17.
 */
import {assertInstanceOf} from '../../util/general';
import {IGame} from './IGame';
class IRoundFactory{
	constructor(){
		this.moved = [];
	}

	setMoved(p){
		assertInstanceOf(p, IPiece);
	}

	setGame(game){
		assertInstanceOf(game, IGame);
	}
}