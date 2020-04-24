# Javascript
These are my simple javascript experiments.
It is unlikely that anyone will find them hugely beneficial,
but here they are.

They are in three groups, as indicated by the first word in the
directory name.

* client - typically one html file with javascript that runs in the browser
* node - a simple non-web oriented node script
* server - some kind of node/npm project, typically running a
    server on localhost:3000

I typically run the client examples in the chrome browser via a URL like:

* file:///home/tom/Javascript/Github/client_4_timer/timer.html

The server examples use node in some way.
Since this involves running npm and doing some setup,
I decided to include a Makefile to run the appropriate npm
commands.  So if you clone this repository and want to run
some example, you will need to just type "make" first.

I know this will make some people crazy, but it is actually
a great way to do things -- so get with it!
