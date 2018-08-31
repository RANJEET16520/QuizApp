var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');  




/*let uri ='mongodb://shkamboj:qwerty123@localhost:27017/open_elec2?authSource=admin';*/


var app = express();
app.set('port', (process.env.PORT || 5000));

const url = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(url);


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

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})