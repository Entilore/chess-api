/**
 * Created by thareau on 28/05/17.
 */
import { assertInstanceOf, assertIsTile } from '../../util/general'
import {IGame} from './IGame';
export class IRoundFactory{
	constructor(){
	}

	setMoved(xFrom, yFrom, xTo, yTo){
		assertIsTile(xFrom, yFrom)
		assertIsTile(xTo, yTo)
	}

	setGame(game){
		assertInstanceOf(game, IGame);
	}

	build(){

	}
}