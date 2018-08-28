var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require("mongoose");

var app = express();

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://shkamboj:qwerty@123@ds237072.mlab.com:37072/quizapp';
app.set('port', (process.env.PORT || 5000))

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
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

var gradeSchema = mongoose.Schema({
    cname:{type: String,
      required: true,
    },
    rollno:{type:String,
      required :true,
      unique: true},
    cg:{type: String,
      required: true
    }
});
var Grade = mongoose.model("Grade", gradeSchema);


app.get('/', function (req, res) {
    res.render('main');
});
app.get('/register', function (req, res)
{
    res.render('reg');
});

app.post('/register',function (req,res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var fullname = req.body.fullname;
  var grade = {
  	username : username,
    password : password,
    email : email,
    fullname : fullname,
  };
  grade.save(function (err) {
    if(err)
    {
      console.log("error");
    }
    else
      console.log(res);
  });
});

app.get('/rank',function(req,res){
   res.render('rank');
});
app.post('/rank',function (req,res) {
  var cname = req.body.cname;
  var rollno = req.body.rollno;
  var cg = req.body.cg;
  var grade = new Grade({
    cname : cname,
    rollno : rollno,
    cg : cg,
  });
  grade.save(function (err) {
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