var express = require('express'),
    request = require('request'),

    mysql = require('mysql');

    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "Hyperion"
    });

    app = express();

    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));

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
      con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM users WHERE Name = 'Ogechi Duru'", function (err, result, fields) {
        if (err) throw err;
        var user = result[0];
        con.query("SELECT * FROM users WHERE NOT Name = '"+result[0]['Name']+"'", function (err, result, fields) {
          var neighbors = result;
          res.render('user', {user : user, neighbors: neighbors});
        });
      });
    });
    });



app.listen(4000, function(){
  console.log("Started on port 4000");
});
