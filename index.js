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
var massiveInstance = massive.connectSync({connectionString : connString},
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

app.set('db', massiveInstance);
var db = app.get('db');


const mainCtrl = require('./mainCtrl.js');

app.get('/api/users', mainCtrl.getAllUsers);
app.get('/api/vehicles', mainCtrl.getAllVehicles);
app.get('/api/user/:userId/vehiclecount', mainCtrl.countVehiclesByUser);
app.get('/api/user/:userId/vehicle', mainCtrl.listVehiclesByOwner);
app.get('/api/vehicle?UserEmail=email', mainCtrl.getVehiclesByEmail);
app.get('/api/vehicle?userFirstStart=letters', mainCtrl.getVehiclesByFirstLettersOfFirstname);
app.get('/api/newervehiclesbyyear', mainCtrl.getVehiclesByYear);


app.post('/api/users', mainCtrl.createUser);
app.post('/api/vehicles', mainCtrl.createVehicle);

app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.updateOwner);

app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.removeOwnershipOfVehicle);
app.delete('/api/vehicle/:vehicleId', mainCtrl.deleteVehicle);




app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
