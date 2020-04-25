/* Tom Trebisky  4-25-2020
 *
 * The idea here is to set up a simple form,
 *  which will generate a POST request.
 * This will require us to fiddle with express
 *  so it handles said POST request.
 * We are also dragging in body-parser,
 *  which is a perfect piece of middleware
 *  (as contrasted with handlebars, but let's
 *  not beat that dead horse any longer).
 *  Anyway, one line to use it, and it does
 *  what you want.
 *
 * This will be some setup for my next demo
 *  which will deal with session variables.
 *
 * ==================
 * When you call res.render('xyz') you need to
 * have two files in place:
 *
 *   views/xyz.hbs
 *   views/layout/main.hbs
 *
 * main.hbs is a wrapper for all pages!
 * xyz.hbs gets injected into {{body}}
 *   in main.hbs
 */

var express = require('express');
const port = 8080;

var hb = require('express-handlebars');

/* We will use this to extract the stuff that
 * a form generated POST request sends to us.
 */
var bodyParser = require('body-parser');

/* Here is the handler for the POST request that results
 * from a form being submitted.
 * We just pass the body object to the render, and let it
 *  pull the values of name and gender as it sees fit.
 * I also, being lazy, just add a property to the body
 *  object and pass the augmented object along.
 */
function person_handler ( req, res )
{
    // console.log ( req.body );
    req.body.ismale = ( req.body.gender == 'male' ) ? true : false;
    return res.render('greeting', req.body );
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

    app.use ( express.static('public') );

    /* This is it!  one line to set up body-parser */
    app.use ( bodyParser.urlencoded({ extended: true }) );

    hb_setup ( app );

    app.post ( "/newperson", person_handler );
    // app.get ( "/info", info_handler );

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
