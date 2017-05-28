/**
 * Created by thareau on 28/05/17.
 */
class IRound{
	constructor(moved, captured = null, previous = null){
		this.moved = moved;
		this.captured = captured;
		this.previous = null;
		this.next = null;
	}
}