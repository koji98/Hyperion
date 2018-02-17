var express = require('express'),
    request = require('request'),
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
      res.render('user');
    });



// app.listen(4000, function(){
//   console.log("Started on port 4000");
// });
