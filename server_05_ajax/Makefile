# Some question arises about what handlebars package to install.
# There seems to be both handlebars and express-handlebars packages
#  in the npm collection.  As near as I can tell, handlebars is
#  is a general package that need not be used with express.
#  Also, as near as I can tell, when you install express-handlebars
#  it pulls in the handlebars package as a dependency.
# My guess is that express-handlebars is a "glue" package
#  that interfaces handlebars to express.

setup:
	npm init -y
	npm install --save express
	npm install --save express-handlebars

run:
	node weather.js

clean:
	rm -rf node_modules
	rm -f package.json
	rm -f package-lock.json
