//Bring in the mongoose module
const mongoose = require('mongoose');

var dbURI = process.env.DATABASE;

//Open the mongoose connection to the database
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology :true }, (err)=>{
	if(err) {
		console.log('Some problem with the connection ' +err);
	}
});

mongoose.set('useCreateIndex', true);


// Db Connection
var db = mongoose.connection;

db.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});

db.on('error', function(err){
	console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', function(){
	console.log('Mongoose disconnected');
});

//Exported the database connection to be imported at the server
exports.default = db;