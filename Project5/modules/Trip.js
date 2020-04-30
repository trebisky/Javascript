var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/travel');  // db name travel, collection name: trips

var tripSchema = new mongoose.Schema({
      date: {type: String, required: true, unique: true},
      city: {type: String, required: true},
      miles: {type: Number, required: true},
      gallons:{type: Number, required: true}
});

tripSchema.virtual('mpg').get(function() {  
	m=(this.miles/this.gallons).toFixed(1)
	return parseFloat(m);
	
});



module.exports = mongoose.model('Trip', tripSchema);


