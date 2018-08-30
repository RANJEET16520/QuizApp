var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongodb = require('mongodb');

var app = express();
app.set('port', (process.env.PORT || 5000))

var MongoClient = mongodb.MongoClient;
var srl = 'mongodb://shkamboj:qwerty@123@ds237072.mlab.com:37072/quizapp';

// Use connect method to connect to the Server
  MongoClient.connect(srl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', srl);

    // do some work here with the database.

    db.createCollection( "contacts", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "phone" ],
      properties: {
         phone: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         email: {
            bsonType : "string",
            pattern : "@mongodb\.com$",
            description: "must be a string and match the regular expression pattern"
         },
         status: {
            enum: [ "Unknown", "Incomplete" ],
            description: "can only be one of the enum values"
         }
      }
   } }
} );

    //Close connection
    db.close();
  }
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