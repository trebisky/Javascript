/* Tom Trebisky  4-26-2020
 *
 * We want to set up the simplest possible Ajax demo.
 */

var express = require('express');
const port = 8080;

var hb = require('express-handlebars');

var bodyParser = require('body-parser');

const hb_ext = 'hbs';

function hb_setup ( app )
{
    app.set ( 'view engine', hb_ext );
    app.engine ( hb_ext, hb ({extname: hb_ext}) );

    // Since we just need boody-parser to do Ajax,
    //  we probably don't need this first line.
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

/* This gets called when the server is successfully launched.
 */
function listen_callback ()
{
    console.log('listening on port ' + port);
}

var test_counter = 0;

function run_server ()
{
    var app = express();

    // We have no static content, so don't need this.
    // app.use( express.static('public') );

    hb_setup ( app );

    /* No static pages, the first visit will get this.
     */
    app.get ( '/', function(req, res) {
	res.render ( 'home' )
    });

    /* This handles our Ajax request.
     * The request has a single "param", which we
     * log and ignore.
     */
    app.post ( "/getline", function(req, res) {
	var param = req.body.param;
	var line;

	test_counter++;
	line = "Testing in Tucson: " + test_counter;
	// We do get the param setting of 1776 !! */
	// console.log ( param );

	/* Does this need to be JSON ? */
	res.send ( line );
    } );

    // app.get ( "/info", info_handler );

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
