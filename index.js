var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://zhtbbfpfdilwgq:c5605d5ccdb1b8a1dfacd53c3b1df190b37769d11144da7b15e6a30f67ddcaba@ec2-54-227-237-223.compute-1.amazonaws.com:5432/d49jk4vt7vsbft?ssl=true";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    // app.set('db', db);
    //
    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
