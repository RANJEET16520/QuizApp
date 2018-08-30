var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const mongoose = require('mongoose');



var app = express();
app.set('port', (process.env.PORT || 5000));

let uri = 'mongodb://shkamboj:qwerty@123@ds237072.mlab.com:37072/quizapp';

mongoose.connect(uri);

var personSchema = mongoose.Schema({
    rollno:{type: String,
      required: true,
      unique: true
    },
    email:{type:String,
      required :true,
      unique: true},
    password:{type: String,
      required: true
    }
});
var Person = mongoose.model("Person", personSchema);

var person = new Person({
    rollno : "IIITU16118",
    email : "iiitu16118@gmail.com",
    password : "abcdef",
  });

person.save(function (err) {
    if(err)
    {
      console.log("error");
    }
    else
      console.log(res);
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