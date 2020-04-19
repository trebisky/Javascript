/* The idea here is to play around and figure out
 * how to set up my own Javascript object
 * Run this via: node obj.js
 */

function grid_func ()
{
    console.log ( "grid_func" );
}

function Grid ( x, y )
{
	this.xdim = x;
	this.ydim = y;
	this.data = new Array ( x * y );
	this.func1 = grid_func;
	this.func2 = function ()
	{
	    console.log ( "anon func" );
	    console.log ( "anon - xdim = " + this.xdim );
	}
}

g = new Grid ( 2, 3 );
h = new Grid ( 10, 11 );

console.log ( g.xdim );
console.log ( g.ydim );
console.log ( g.data.length );
console.log ( h.data.length );
g.func1 ();
h.func2 ();

// The end
