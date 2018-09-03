var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
const fs = require('fs');
var passwordHash = require('password-hash');
var alert = require('alert-node');



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


var abcSchema = mongoose.Schema({
    a:{type: String,
      required: true,
      unique: true
    },
    b:{type:String,
      required :true,
      unique: true},
    c:{type: String,
      required: true
    }
});
var Abc = mongoose.model("Abc", abcSchema);


var app = express();
app.set('port', (process.env.PORT || 5000));

// var uri ='mongodb://shkamboj:qwerty123@localhost:27017/open_elec16?authSource=admin'; 

var uri = 'mongodb://amit:amit123@ds237072.mlab.com:37072/quizapp';

 
mongoose.connect(uri);




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

app.get('/signup',function(req,res){
   res.render('signup');
});




    

     
app.post('/signup',function (req,res) {
  var rollno = req.body.rollno;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = passwordHash.generate(password);
  console.log(hashedPassword);
  var person = new Person({
    rollno : rollno,
    email : email,
    password : hashedPassword,
  });
  person.save(function (err) {
    if(err)
    {
      console.log("ERRONN");
    }
    else
    {
      alert('Successfully Registered.');
      res.redirect('/');
    }
  });
});


app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})