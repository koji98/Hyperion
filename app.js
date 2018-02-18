var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mysql = require('mysql');

    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "Hyperion"
    });

    app = express();

    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/', function(req, res){
      res.render('landing');
    });

    app.get('/about', function(req, res){
      res.render('about');
    });

    app.get('/technology', function(req, res){
      res.render('technology');
    });

    app.get('/user', function(req, res){
      con.query("SELECT * FROM users WHERE Name = 'Ogechi Duru'", function (err, result, fields) {
        if (err) {
          throw err;
          con.end();
        }
        var user = result[0];
        con.query("SELECT * FROM users WHERE NOT Name = '"+result[0]['Name']+"'", function (err, result, fields) {
          var neighbors = result;
          res.render('user', {user : user, neighbors: neighbors});
        });
      });
    });

    app.get('/enter', function(req, res){
      res.render("enter");
    });

    app.post('/register', function(req, res){
      // con.connect(function(err){
      //   if(err){
      //     throw err;
      //   } else {
      //       con.query("SELECT Email FROM users", function(err, result, fields){
      //         if(err){
      //           throw err;
      //         } else {
      //           for(var i = 0; i < result.length; i++){
      //             if(result[i]['Email'] == req.body.newUser.email){
      //               alert('Email already exists');
      //               return;
      //             }
      //           }
      //           let name = req.body.newUser.name;
      //           let location = req.body.newUser.location;
      //           let email = req.body.newUser.email;
      //           let password = req.body.newUser.password;
      //
      //
      //           con.query("INSERT INTO `users` (`Name`, `Location`, `Email`, `Password`) VALUES ('Hey', 'Nice', 'Job', 'Chidi')");
      //         }
      //       });
      //   }
      // });


      //
      // if()
      // console.log(req.body.newUser.email);
      // res.send("hi");
    });

    app.post('/login', function(req, res){

    });



app.listen(4000, function(){
  console.log("Started on port 4000");
});
