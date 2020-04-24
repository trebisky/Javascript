/* Tom Trebisky  4-23-2020
 *
 * The idea here is to use node (and nothing but node)
 * to set up a basic http server that runs on port 8080.
 * Node includes a basic http module which we use.
 *
 * This server gives a "special" response when the
 *  /test resource is requested.
 * In all other cases it responds with
 *  the "hello world" page.
 *
 * We could use this to build any kind of http server,
 * but there are libraries (like express) that we will
 * use for anything more complex.
 */

var http = require('http');
const port = 8080;

function respond ( res, msg )
{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("<html><body>");
      res.write( msg );
      res.write("</html></body>");
      res.end();
}

function req_handler ( req, res )
{
    if (req.url == "/test") {
        respond ( res, "Test ***" );
	return;
    }
    respond ( res, "Hello World!" );
}

function run_server ()
{
    var server;

    server = http.createServer( req_handler )
    server.listen ( port );
}

run_server ();

// THE END
