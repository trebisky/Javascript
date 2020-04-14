var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cars4sale');  // db name = cars4sale

var carSchema = new mongoose.Schema({
	cid: {type: Number, required: true, unique: true},
	year: {type: Number, min: 0, required: true},
	make: {type: String, min: 0, required: true},
	model: {type: String, min: 0, required: true},
	miles: {type: Number, min: 0, required: true},
	price: {type: Number, min: 0, required: true},
	dealer_id: {type: String, min: 0, required: true},
});

module.exports = mongoose.model('Car', carSchema);


