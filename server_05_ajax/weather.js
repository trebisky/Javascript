/* Tom Trebisky  4-24-2020
 *
 * This builds on server_03_info
 * I don't intend to do anything new other than
 * to pull in handlebars and use it to generate
 * the response for the "/info" route.
 * Having an html template in "views" should
 * be a nice improvement over crafting the html
 * using a bunch of res.write() calls.
 *
 * This is true in principle, but getting set up to
 *  use handlebars is somewhat of a pain in the ass.
 *
 * The main problem is that the documentation for
 * express-handlebars is mediocre at best, not to
 * mention confusing.
 *
 * When you call res.render('info') you need to
 * have two files in place:
 *
 *   views/info.hbs
 *   views/layout/main.hbs
 *
 * main.hbs is a wrapper for all pages!
 * info.hbs gets injected into {{body}}
 *   in main.hbs
 */

var express = require('express');
const port = 8080;

var hb = require('express-handlebars');

/* This module is supposed to set things up to allow cross domain Ajax stuff.
 * But so far it does not work.
 *
 * https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
 */
var cors = require('cors');

/* optional monkey business */
var child_process = require('child_process');

/* I apologize for this, but I wanted to play around with
 * running system commands from javascript (on the server)
 * and then letting handlebars inject their output into
 * the displayed page.
 *
 * Multi line system commands like ls -l or ps -alx just
 * make a mess since all the lines run together.
 * We would have to add a bunch of <br> to make it look right.
 * It doesn't matter since we are just horsing around.
 */
function get_command ()
{
    var cmd = "pwd";
    return child_process.execSync ( cmd );
}

/* The ps command works now, but is really really long.
 * And we get a Buffer and not a String.
 */
function get_command_lines ()
{
    // var cmd = "ps -alx";
    var cmd = "ls -l";
    var stuff = child_process.execSync ( cmd );
    if ( typeof ( stuff ) == "string" ) {
	return stuff.split ( "\n" );
    } else {
	return stuff.toString().split ( "\n" );
    }
}

function get_command_multi ()
{
    var lines = get_command_lines();
    var rv = "";

    lines.forEach ( function (line) {
	rv += "<br>" + line;
    });
    return rv;
}

/* This is really what Handlebars is all about.
 * We can inject values into templates.
 * They may be pages, layouts, or partials.
 * There are also helpers, which allow logic inside
 * of the templates (which live in the "views" directory).
 */
function info_handler ( req, res )
{
    var date = new Date();
    var date_str = date.toLocaleString();
    var sys = get_command();
    var sys2 = get_command_multi();

    return res.render('info',
	{ date: date_str,
	  system: sys,
	  system2: sys2 }
    );
}

/* I centralize all the handlebars setup rubbish here
 * so that I have a central place to complain about it.
 *
 * There are lots of tutorials, most of which are confusing.
 * The best source, amazingly, is by the author at:
 *   https://www.npmjs.com/package/express-handlebars
 *
 * I tried to change the file extent from "handlebars"
 *   to "hbs". It took a while to learn that the new
 *   string needs to go in 3 different places!
 * I use a variable to make it clear where these are.
 * Note that you can include the "dot" or not, as you see fit.
 */

// const hb_ext = '.handlebars';
const hb_ext = 'hbs';

function hb_setup ( app )
{
    app.set ( 'view engine', hb_ext );
    app.engine ( hb_ext, hb ({extname: hb_ext}) );
}

/* This gets called when the server is successfully launched.
 */
function listen_callback ()
{
    console.log('listening on port ' + port);
}

function run_server ()
{
    var app = express();

    app.use( express.static('public') );

    app.use ( cors() );

    hb_setup ( app );

    app.get ( "/info", info_handler );

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
