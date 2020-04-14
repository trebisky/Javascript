/*   database: cars4sale    Create, Retrieve, Update, Delete  ---  CRUD    */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Car = require('./modules/Car.js');  // our Item model
app.use(express.static('public'))         // serve static file

 // default route request returns index.html from the public folder

app.use('/showAll', function(req, res) {   // Retrieve many

    Car.find( function(err, foundItems) {   // Model.find(), returns foundItems
	if (err) {
	    res.status(500).send(err);
	}
	else {
	    for(var i = 0; i < foundItems.length; i++) {
		res.write("<p>" + foundItems[i].cid + ", " +foundItems[i].year +", " +foundItems[i].make +", " +
		 foundItems[i].model + ", " +foundItems[i].miles + ", " +foundItems[i].price +  "</p>");
	    }
	    res.end();   // terminate request
	}
    });
})

app.post('/addCar', function(req, res) {    // Create

    var newCar = new Car ({
	cid: req.body.cid,
	year: req.body.year,
	make: req.body.make,
	model: req.body.model,
	miles: req.body.miles,
	price: req.body.price,
	dealer_id:req.body.dealer_id
    });

    console.log( newCar );

    newCar.save( function(err) {
	if (err) {
	   res.status(500).send(err);
	}
	else {
	   res.send("Car successfully added.");
	}
   });
});


app.post('/findCar', function(req, res) {    // Retrieve 1

    var searchCid = req.body.cid
    Car.findOne( {cid: searchCid}, function(err, foundItem) {  // foundItem holds the document that was found
	if (err) {
	   res.status(500).send(err);
	}
	else if (!foundItem) {
	   res.send('No item with the car ID ' + searchCid);
	}
	else {
	    res.send(foundItem.cid + ", " + foundItem.year + ", " + foundItem.make);  // +
	}
    });
});


app.post('/updateCar', function(req, res) {   // Update (edit)

    var updateCid = req.body.cid;
    var updateMiles = req.body.miles;
    var updatePrice = req.body.price;

    Car.findOne( {cid: updateCid}, function(err, item) {  // small i item holds the document to be updated
	if (err) {
	   res.status(500).send(err);
	}
	else if (!item) {
	   res.send('No car with ID ' + updateCid);
	}
	else {
	    item.miles = updateMiles;
	    item.price = updatePrice;

	    item.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
            });
	   res.send("Update successful");
      }
    });
});

app.post('/deleteCar', function(req, res) {   // Delete
    var deleteCid = req.body.cid;

    Car.findOneAndRemove({cid: deleteCid}, function(err, item) {
	if (err) {
	   res.status(500).send(err);
	}
	else if (!item) {
	   res.send('No car with ID ' + deleteCid);
	}
	else {
	   res.send("Car with ID : " + deleteCid + " deleted.");
	}
    });
});

/* I don't know what this is.
    Car.collection.insert(newCars, function (err, docs) {
        if (err){ 
            res.status(500).send(err);
        } 
		else {
		    res.send( "Cars were added." ); 						  
        }
    });
});
*/

app.listen(3000,  function() {
    console.log('Listening on port 3000, ctrl-c to quit');
});

// THE END
