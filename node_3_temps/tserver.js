// tserver
// Tom Trebisky 4-27-2020
// Test this with "telnet localhost 2002"

// net is part of stock node, so we don't need
// any npm packages.
var Net = require('net');

// const port = 2001;
const port = 2002;

// We want to generate this:
//  04-28-2020 19:30:06

function mk_timestamp ()
{
    var now = new Date();

    hh = now.getHours(); 
    mm = now.getMinutes();
    ss = now.getSeconds();

    mom = ("0" + (now.getMonth() + 1)).slice(-2);
    dd = ("0" + now.getDate()).slice(-2);
    y = now.getFullYear();

    hms = hh + ":" + mm + ":" + ss;
    mdy = mom + "-" + dd + "-" + y;

    return mdy + " " + hms
}

/* You get either a buffer or a string,
 * an ambiguity that I find annoying.
 * so far my tests with telnet always yield a string
 */
function data_handler ( raw )
{
    var line;
    // temps = chunk.toString();
    // console.log ( 'Data received, ' + typeof(temps) );

    temps = raw.toString().trim ();
    line = mk_timestamp() + " " + temps
    console.log ( 'Data: ' + line );
}

// There is also net.createServer()
// I don't know why you would use that instead of this.
var server = new Net.Server();

server.listen ( port, function() {
    console.log( `Listening on localhost:${port}` );
});

/* When there is a connection, we only listen.
 */
server.on('connection', function(socket) {
    console.log('new connection');

    // If we did write, we would do this.
    // socket.write('Hello');

    socket.on('data', data_handler );

    socket.on('end', function() {
        console.log('Connection closed');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
// THE END
