/* Tom Trebisky  4-23-2020
 *
 * Here is my first project using npm and express.
 * Notice the Makefile to do the npm setup.
 *
 * What I want to do is to simply serve static files
 * out of public.  This is a nice step from the simple
 * server using the http module because we can format
 * these html files just like on any old server
 * (such as Apache) and stick them into the public
 * directory, rather than crafting html inside of
 * javascript with a bunch of res.write calls.
 */

var express = require('express');
const port = 8080;

function listen_callback ()
{
    console.log('listening on port ' + port);
}

function run_server ()
{
    var app = express();

    app.use( express.static('public') );
    // app.listen ( port, () => console.log('listening on port ' + port));
    app.listen ( port, listen_callback );
}

/* Note that "app.use" installs middleware, in this case the
* "static" processing module.
*
* Also note the use of the "arrow function" syntax in the listen call.
* This kind of terse syntax buys us little in an example like this,
* so I comment it out and use the simpler but more verbose code
* (even adding an actual callback function) for clarity.
*/

run_server ();

// THE END
