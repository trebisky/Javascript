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
    //  we don't need this line.
    //  (it would be needed if we posted data from a form)
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
     * This is it !!!  This is all we need to do!
     */
    app.post ( "/getline", function(req, res) {
	var param = req.body.param;
	var line;

	// We do get the param setting of 1776 !! */
	// console.log ( param );

	test_counter++;
	line = "Testing in Tucson: " + test_counter;

	res.send ( line );
    } );

    app.listen ( port, listen_callback );
}

run_server ();

// THE END
