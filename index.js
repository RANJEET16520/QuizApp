var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.set('port', (process.env.PORT || 5000))

var path = require('path');
app.use('/static',express.static(__dirname + '/public'));

const url = require('url');

app.set("view options", { layout: false } );
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.send('privacy and policy : no one can use our copyrights.')
})

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})