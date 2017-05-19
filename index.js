var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://zhtbbfpfdilwgq:c5605d5ccdb1b8a1dfacd53c3b1df190b37769d11144da7b15e6a30f67ddcaba@ec2-54-227-237-223.compute-1.amazonaws.com:5432/d49jk4vt7vsbft?ssl=true";

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var massiveInstance = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    // console.log(db)
    app.set('db', massiveInstance);
  
    
    app.get('/api/users', function(req, res, next){
        db.getAllUsers(function(err, users){
            return res.status(200).send(users);
        })
    });
    app.get('/api/vehicles', function(req, res, next){
        db.getAllVehicles(function(err, results){
            return res.status(200).send(results);
        })
    });
    // ********May have to return arr[0] here**************//
    app.get('/api/user/:userId/vehiclecount', function(req, res, next){
        let id = req.params.userId;

        db.countVehiclesByUser([id], function(err, results){
            return res.status(200).send(results[0]);
        })
    });
    app.get('/api/user/:userId/vehicle', function(req, res, next){
        let id = req.params.userId;
        db.listVehiclesByOwner([id], function(err, results){
            return res.status(200).send(results);
        })
    });
    app.get('/api/vehicle', function(req, res, next){
      let email = req.query.UserEmail;
      let letters = req.query.userFirstStart;
      console.log(letters);
      if (email){
        db.getVehiclesByEmail([email], function(err, results){
            return res.status(200).send(results);
        })
      }else if (letters){
        db.getVehiclesByFirstLettersOfFirstname([letters], function(err, results){
            return res.status(200).send(results);
        })
      }
    });
    app.get('/api/newervehiclesbyyear', function(req, res, next){
      db.getVehiclesByYear(function(err, results){
            return res.status(200).send(results);
        })
    });


    app.post('/api/users', function(req, res, next){
      let user = req.body;
      db.createUser([user.firstname, user.lastname, user.email], function(err, results){
            return res.status(200).send(results);
        })
    });
    app.post('/api/vehicles', function(req, res, next){
      let make = req.body.make;
      let model = req.body.model;
      let year = Number(req.body.year);
      let ownerid = Number(req.body.ownerid);

      db.createVehicle([make, model, year, ownerid], function(err, results){
            return res.status(200).send(results);
        })
    });


    app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next){
      let carid = req.params.vehicleId;
      let userid = req.params.userId;
      db.updateOwner([userid, carid], function(err, results){
            return res.status(200).send(results);
        })
    });
    

    app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next){
      let carid = req.params.vehicleId;
      db.removeOwnershipOfVehicle([carid], function(err, results){
            return res.status(200).send(results);
        })
    });
    app.delete('/api/vehicle/:vehicleId', function(req, res, next){
      let id = req.params.vehicleId;
      db.deleteVehicle([id], function(err, results){
            return res.status(200).send(results);
        })
    });








    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
}
)

// app.set('db', massiveInstance);
// var db = app.get('db');
// console.log(db)


// const mainCtrl = require('./mainCtrl.js');






app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

// module.exports = app;
