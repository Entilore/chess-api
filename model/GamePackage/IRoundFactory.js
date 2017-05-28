/**
 * Created by thareau on 28/05/17.
 */
class IRoundFactory{
	constructor(){
		this.moved = [];
	}

	setMoved(p){
		assertInstanceOf(p, IPiece);
	}
}