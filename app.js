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
        if (err) throw err;
        var user = result[0];
        con.query("SELECT * FROM users WHERE NOT Name = '"+result[0]['Name']+"'", function (err, result, fields) {
          var neighbors = result;
          res.render('user', {user : user, neighbors: neighbors});
        });
      });
    });

    // app.get('/enter', function(req, res){
    //   res.render("enter");
    // });

    app.post('/register', function(req, res){
      con.query("SELECT Email FROM users", function(err, result, fields){
        if(err){
          throw err;
        } else {
          for(var i = 0; i < result.length; i++){
            if(result[i]['Email'] == req.body.newUser.email){
              //alert('Email already exists');
              res.redirect("enter");
              return;
            }
          }
          let name = req.body.newUser.name;
          let location = req.body.newUser.location;
          let email = req.body.newUser.email;
          let password = req.body.newUser.password;


          con.query("INSERT INTO `users` (`Name`, `Location`, `Email`, `Passwords`) VALUES ('"+name+"', '"+location+"', '"+email+"', '"+password+"')");

          res.redirect("address");
        }
      });


      //
      // if()
      // console.log(req.body.newUser.email);
      // res.send("hi");
    });

    app.post('/login', function(req, res){
      con.query("SELECT * FROM users", function(err, result, fields){
        if(err){
          throw err;
        } else {
          for(var i = 0; i < result.length; i++){
            if(result[i]['Email'] == req.body.newUser.emaillogin){
              if(result[i]['Passwords'] == req.body.newUser.passwordlogin){
                var user = result[i];
                con.query("SELECT * FROM users WHERE NOT Name = '"+result[i]['Name']+"'", function (err, result, fields) {
                  var neighbors = result;
                  console.log(neighbors);
                  //res.render('user', {user : user, neighbors: neighbors});
                  res.redirect
                  return 0;
                });
              }
            }
          }
          res.redirect("enter");
          //alert('Wrong email or password');
        }
      });
    });



app.listen(4000, function(){
  console.log("Started on port 4000");
});
