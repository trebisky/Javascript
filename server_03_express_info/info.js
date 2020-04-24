/* Tom Trebisky  4-23-2020
 *
 * This builds on server_02_static
 * Here we tie the pages together via some links.
 * This is just standard html editing in the
 * public directory.
 * We add a route called "info" and we create a link
 * to it in the index.html page so we can avoid
 * having to craft URL's on the browser URL line.
 * 
 * The nice thing about express static pages is that
 * we can set them up and then just lay a route or
 * two on top of them.
 *
 * Since we are just using express, we have to craft the
 * html response ourselves right here.
 * If we use a templating engine, it will do much of the
 * work for us (which is what ejs or handlebars is
 * all about).
 */

var express = require('express');
const port = 8080;

/* optional monkey business */
var child_process = require('child_process');

/* This gets called when the server is successfully launched.
 */
function listen_callback ()
{
    console.log('listening on port ' + port);
}

/* Multi line system commands like ls -l or ps -alx just
 * make a mess since all the lines run together.
 * We would have to add a bunch of <br> to make it look right.
 * It doesn't matter since we are just horsing around.
 */
function get_command ()
{
    var cmd = "pwd";
    // var cmd = "ps -alx";
    return child_process.execSync ( cmd );
}

function info_handler ( req, res )
{
    var date = new Date();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<html><body>");
    res.write ( 'info handler called' );

    res.write ( "<p>\n" );
    res.write ( "Date: " );
    res.write ( date.toLocaleString() );

    res.write ( "<p>\n" );
    res.write ( "System: " );
    res.write ( "<br>\n" );
    res.write ( get_command () );

    res.write("</html></body>");
    // res.send ( 'info handler called' );
    res.end();
}

function run_server ()
{
    var app = express();

    app.use( express.static('public') );
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
