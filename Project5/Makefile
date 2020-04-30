# Tom Trebisky  4-25-2020

# The workaround to force the old version of handlebars is to avoid this mess:
## Handlebars: Access has been denied to resolve the property "date" because it is not an "own property" of its parent.
## You can add a runtime option to disable the check or this warning:
## See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details
# I still cannot get rid of this.  There is a lot online.
# My version of express-handlebars always gets handlebars 4.7.6 and gives this error.
# They say that anything returned by mongoose will have this issue.
# This is some kind of security fix by the handlebars team.

setup:
	npm init -y
	npm install -D handlebars@4.5.0
	npm install --save express
	npm install --save mongoose
	npm install --save express-handlebars
	npm install --save body-parser
	#npm install handlebars@4.5.0 --save

run:
	node index.js

clean:
	rm -rf node_modules
	rm -f package.json
	rm -f package-lock.json
