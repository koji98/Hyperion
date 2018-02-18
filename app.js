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
      var user = "";
      con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM users WHERE Name = 'Ogechi Duru'", function (err, result, fields) {
        if (err) throw err;
        user = result[0];
        res.render('user', {user : user});
      });
    });
    });



app.listen(4000, function(){
  console.log("Started on port 4000");
});
