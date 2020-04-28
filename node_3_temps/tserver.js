// tserver
// Tom Trebisky 4-27-2020
// Test this with "telnet localhost 2002"

// net is part of stock node, so we don't need
// any npm packages.
var Net = require('net');

// const port = 2001;
const port = 2002;

// There is also net.createServer()
// I don't know why you would use that instead of this.
var server = new Net.Server();

server.listen ( port, function() {
    console.log( `Listening on localhost:${port}` );
});

function data_handler ( chunk )
{
    temps = chunk.toString();
    console.log ( 'Data: ' + temps );
}

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
