//Going to figure this out if it takes me all day! and the next and the next
var express = require('express');
var app = express();

var exphbs = require('express-handlebars'); 
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use ( bodyParser.urlencoded({ extended: true }) );

app.use(express.static('public'))  // serve static file
var Trip = require('./modules/Trip.js');


app.get('/showAll', function(req, res) {   				  
	Trip.find( function(err, allTrips) {   
		if (err) {
		     res.render('resultPage', {result : err});   // Something about a trip
		}
		else {
		    if (allTrips.length == 0) {  // no trips exist
			   res.render('resultPage', {result : 'No trip data available.'});   //hmmm 
		    }
		    else {
			   res.render('showAll', { trips: allTrips });  //show all the trips
		    }
		}
	}); 
});


app.get('/', function(req, res) {   // Default 'Our Website' opens Add a New Trip Page
	res.redirect('/addTrip' ); 
});


app.get('/addTrip', function(req, res){  // recieves posted data 
		res.render('addTripForm');
	});
	


app.use('/addTrip',function(req,res) {
	
		if(req.method=="GET") {
		    res.render('addTripForm',{title: 'addtrip'});
         }
         else if(req.method =="POST") {
              var newTrip =new Trip({       // add new trip to db
               date: req.body.date,
               city:req.body.city,
               miles: req.body.miles,
               gallons: req.body.gallons,
               mpg: req.body.mpg
        });

	newTrip.save( function(err){
		if (err) {
		    res.render ('resultPage', {result : 'Error adding trip'});
		}
		else {
		    res.render ('resultPage', {title: 'add trip', result: 'new trip added'});
			// if (allTrips.length == 0) {
			// res.render ('resultPage', {result: 'No trip data available.'});
			// }
			// else {
			//     res.render ('resultPage', {title: 'add trip', result: 'new trip added'});
			// }
		}
	    });
	}
});


app.use ('/getByCity', function(req, res)  {
	if(req.method=="GET") {
	    res.render('getCityForm',{title: 'trips by city'});
	} else if(req.method == "POST"){
		
		var reqCity = req.body.city;
		    // reqCity = reqCity.toLowerCase()

		    console.log("Get trips for city: " + reqCity);
		    
		Trip.find( {city:reqCity}, function (err, allByCity) {
		    if (err) {
			res.render ('resultPage', {result : 'No trips to that city.'});
		    } else {
			console.log("This many trips were found: " + allByCity.length );
			  if (allByCity.length == 0) {
        res.render ('resultPage', {result : 'No trips to that city.'});
		}
			else {	
	res.render('showAll', { trips: allByCity });
	 }
	}
   });
  }
});
		
app.get('/editTrip', function (req,res) { // called from A tag next to trip

	//console.log(req);
	//console.log(req.body);
	console.log(req.query);
	// var date = req.body.tripDate;
	var date = req.query.tripDate;
	console.log(date);

	Trip.findOne( {date: date}, function(err,aTrip) { //find the trip by date
		if(err) {
				res.render('resultpate',{result : err});
		}
		else if (!aTrip) {
				res.render ('resultPage', {result : 'What fool? Ain"t no trip on' + date});
		}
		else{
		    console.log(aTrip)
		    // I just pass the aTrip object directly to render
		    // I add a title property to that object.
		    aTrip.title = 'Edit trip data';
		    // res.render('editTripForm',{title: 'trip data'});		
		    res.render('editTripForm',aTrip);
		}
	} );

});

		
//app.post('/editTrip', function(req,res) { //posted from editTripForm
//
//	var date =req.body.date;
//	
//	Trip.findOne( {date: date}, function(err,aTrip) { //find the trip by date
//	console.log(date);
//		if(err) {
//				res.render('resultpate',{result : err});
//		}
//		else if (!aTrip) {
//				res.render ('resultPage', {result : 'What fool? Ain"t no trip on' + date});
//		}
//		else{
//			console.log(aTrip)
//			res.render('documentPage', {tripData: aTrip});
//		}
//	});
//	
//});

app.post('/editTrip', function(req, res) {

	var date = req.body.tripDate;
	console.log (req.body);
	console.log ('date for edit post is:' + date)
	
	Trip.findOne( {date: date}, function(err, aTrip ) { //????why is this 2x? I thought it was line106
		if (err) {
			res.render('resultPage', {result : err});
		}
		else if (!aTrip) {
				res.render ('resultPage', {result : 'No trip in database from' + date});
		}
		else {
			console.log('updated info')
		if(req.body.newMiles) aTrip.miles = req.body.newMiles;
		if (req.body.newGallons) aTrip.gallons = req.body.newGallons;
		
			aTrip.save(function (err) {  //save the new info
			    if(err) {
			    	res.render('resultPage', {result : err});
			    }
			});
				var msg ="The trip taken on" + date+ "was changed on the long crazy list"
				res.render('resultPage', {result : msg });
			}
		});
	});

app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });

/*app.use('/getByMajor', function(req, res) {   
    if(req.method == "GET") {
		res.render('getMajorsForm', {title: 'students by major'});
	}
	else if(req.method == "POST") {
		
		var reqMajor = req.body.major;
		//console.log(reqMajor);
		Student.find( {major: reqMajor}, function(err, allByMajor) {  
			if (err) {
				res.render('resultPage', {result : err});   
			}
			else {
				if (allByMajor.length == 0) { 
					res.render('resultPage', {result : 'No students with that major.'});   
				}
				else {
					res.render('showAll', { students: allByMajor });  
				}
			}
		});
	
	}
    
});


app.get('/getStudent', function(req, res) {   // called from link in nav bar
		res.render('getStudentForm', {title: 'student scores'});
});


app.post('/displayStudentInfo', function(req, res) {   // posted from getStudentForm
					
	var sid = req.body.sid;
	//sid = parseInt(sid);
	
	Student.findOne( {sid: sid}, function(err, aStudent) {     // find the student
	console.log(sid);
		if (err) {
				res.render('resultPage', {result : err});   
		}
		else if (!aStudent) {
				res.render('resultPage', {result : 'No student with SID:' + sid});   
		}
		else {		
		    console.log(aStudent)
			res.render('documentPage', {studentData: aStudent});
		}
	});    
	
});


app.post('/updateStudentInfo', function(req, res) {   // posted from  documentPage
	
	var sid = req.body.sid;
	
	Student.findOne( {sid: sid}, function(err, aStudent) {     // find the student
		if (err) {
			console.log('got here a: ' + sid)
			res.render('resultPage', {result : err});   
		}
		else if (!aStudent) {
				res.render('resultPage', {result : 'No student with that ID'});   
		}
		else {
			console.log('got here d')
			if(req.body.newMajor) aStudent.major = req.body.newMajor;       //update the properties
			if(req.body.newMidterm) aStudent.midterm = req.body.newMidterm;
			if(req.body.newFinal) aStudent.final = req.body.newFinal;
			
			aStudent.save(function (err) {     // save the new info
				if(err) {
					res.render('resultPage', {result : err});   
				}
			});
			var msg = "Student data updated for student sid: " + sid;
			res.render('resultPage', { result : msg });
	   }
	});    
});



app.get('/deleteStudent', function(req, res) {   // get request from Search Admin link in nav bar
	
		var sid = req.query.sid;   //assumes username is unique
	 
		Student.findOneAndRemove({sid: sid}, function(err, aStudent) {  
			if (err) {
				res.render('resultPage', {result : err});
			}
			else if (!aStudent) {
				res.render('resultPage', {result : 'No student with that ID'});
				
			}
			else {
				var msg = "student with sid =  " + sid + " has been deleted.";
				res.render('resultPage', { result : msg });
			}
		});
		
});
					  

*/
