var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const mongodb = require('mongodb');

var app = express();
app.set('port', (process.env.PORT || 5000));

let seedData = [
  {
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  },
  {
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  },
  {
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  }
];


let uri = 'mongodb://shkamboj:qwerty@123@ds237072.mlab.com:37072/quizapp';

/*mongodb.MongoClient.connect(uri, function(err) {

  if(err) throw err;

   db.createCollection('songs');

  songs.insert(seedData);
});*/




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