var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongo = require('mongodb');

var app = express();
app.set('port', (process.env.PORT || 5000))

mongo.connect(process.env.MONGOLAB_URI, {}, function(error, db){

  // console.log will write to the heroku log which can be accessed via the 
  // command line as "heroku logs"
  db.addListener("error", function(error){
    console.log("Error connecting to MongoLab");
  });
  db.createCollection('requests');
  db.requests.insert("name":"shubham");
    
});

app.set('view engine', 'ejs');
app.set('views','./views');

var path = require('path');
app.use('/static',express.static(__dirname + '/public'));

const url = require('url');

app.set("view options", { layout: false } );
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', function (req, res) {
    res.render('main');
});


app.get('/register', function (req, res)
{
    res.render('reg');
});

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})