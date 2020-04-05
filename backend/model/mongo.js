const mongoose    =   require("mongoose");
//c.connect('mongodb://localhost:27017/testqwe');
//const mongo = require('mongodb').MongoClient
//var MongoClient = require('mongodb').MongoClient;

// MongoDB Databse url
var mongoDatabase = 'mongodb://localhost:27017/tt';
 
// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected to : ' + mongoDatabase) },
    err => { console.log('There is problem while connecting database ' + err) }
    );

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var SchemaS  = new mongoSchema({
    Emp_Id: Number,
    Emp_Name: String,
    Role: String,
    Competency:[{"Tech": String,"Level": String}]
});
// create model if not exists.
 
module.exports = mongoose.model('users',SchemaS);
