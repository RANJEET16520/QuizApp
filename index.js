var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

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
var Children= mongoose.model("Children", childrenSchema);

var childrenSchema = mongoose.Schema({
    rollno:{type: String,
      required: true,
      unique: true
    },
    email:{type:String,
      required :true,
      unique: true}
  });
var Children = mongoose.model("Children", childrenSchema);


var app = express();
app.set('port', (process.env.PORT || 5000));

/*var uri ='mongodb://shkamboj:qwerty123@localhost:27017/open_elec1?authSource=admin';*/ 

var uri = 'mongodb://shkamboj:qwerty@123@ds237072.mlab.com:37072/quizapp';   
//(Focus on This Variable)

// Use connect method to connect to the Serve
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
  var person = new Person({
    rollno : rollno,
    email : email,
    password : password,
  });
  console.log(person);
  person.save(function (err) {
    if(err)
    {
      console.log("error");
    }
    else
      console.log(res);
  });
});

app.get('/signup',function(req,res){
   res.render('sign');
});


app.post('/sign',function (req,res) {
  var rollno = req.body.rollno;
  var email = req.body.email;
  var children = new Children({
    rollno : rollno,
    email : email,
  });
  console.log(children);
  person.save(function (err) {
    if(err)
    {
      console.log("error");
    }
    else
      console.log(res);
  });
});


app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})