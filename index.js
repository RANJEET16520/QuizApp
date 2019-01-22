var
  express = require('express'),
  url = require('url'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  
  cookieSession = require('cookie-session'),
  mailer = require('express-mailer'),
  quizzer = require('node-quizzer'),
  passwordHash = require('password-hash'),
  _ = require('underscore-node'),
  getQuiz = function(method, req) {
    var urlParts = url.parse(req.url, true),
      query = urlParts.query,

      // generate random quiz
      quiz = quizzer[method]({
        uname: query.fullname,
        uemail: query.email,
        name: query.quiz,
        count: parseInt(query.count),
        time: parseInt(query.time),
        perc: parseInt(query.perc)
      });

    return quiz;
  };




// multer = require("multer"),
//   cloudinary = require("cloudinary"),
//   cloudinaryStorage = require("multer-storage-cloudinary"),
// var express = require('express');
// var bodyParser = require('body-parser');
// var request = require('request');
// var mongoose = require('mongoose');
// const fs = require('fs');
// var JSAlert = require("js-alert");
// var cookieParser = require('cookie-parser');
// var passwordHash = require('password-hash');
// var alert = require('alert-node');
// var pdf = require('express-pdf');
// var PDF = require('pdfkit'); 
// var mailer = require('express-mailer');
// var session = require('express-session');
// var cookieSession = require('cookie-session');
// var nodemailer = require('nodemailer');
// var mailer = require('express-mailer');
// var randomUrl = require('random-url');
// var async = require('async');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
// var passportfb = require('passport-facebook');


var count=1;



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



var quizqSchema = mongoose.Schema({
    q1:{
      type: String,
      required: true,
      unique: true
    },
    q11:{
      type: String,
      required: true,
      unique: true
    },
    q12:{
      type: String,
      required: true,
      unique: true
    },
    q13:{
      type: String,
      required: true,
      unique: true
    },
    q14:{
      type: String,
      required: true,
      unique: true
    },
    anss:{
      type: String,
      required: true
    }
});

var Quizq = mongoose.model("Quizq", quizqSchema);





var facultySchema = mongoose.Schema({
  fname:{type: String,
      required: true,
    },
    teach_id:{type: String,
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
var Faculty = mongoose.model("Faculty", facultySchema);


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


var testScore = mongoose.Schema({
  uname:{type: String,
      required: true,
      unique : false
    },
    topic:{type:String,
      required :true,
      unique : false
    },
    total_ques:{type: String,
      required: true,
      unique : false
    },
    correct:{type:String,
      required :true,
      unique : false
    },
    percentage:{type: String,
      required: true,
      unique : false
    }
});
var Test = mongoose.model("Test", testScore);



var codeSwap = mongoose.Schema({
  uname:{type: String,
      required: true,
      unique : false
    },
    total_ques:{type: String,
      required: true,
      unique : false
    },
    correct:{type:String,
      required :true,
      unique : false
    },
    percentage:{type: String,
      required: true,
      unique : false
    }
});
var Code = mongoose.model("Code", codeSwap);



var pdfSchema = mongoose.Schema({
    fullname:{type: String,
      required: true
    },
    billby:{type:String,
      required :true},
    billto:{type: String,
      required: true
    },
    date:{type: String,
      required: true
    }
});
var Pdf = mongoose.model("Pdf", pdfSchema);


var linkSchema = mongoose.Schema({
  link:{type: String,
      required: true,
      unique: true
    },
    count:{type: Number,
      unique: true,
      startAt: 1,
    incrementBy: 1
  	}
});
var Link = mongoose.model("Link", linkSchema);



var createSchema = mongoose.Schema({
  noq:{type: String,
      required: true,
    },
    quiz_name:{type: String,
      required: true,
      unique: true
    }
});
var Create = mongoose.model("Create", createSchema);


// const storage = cloudinaryStorage({
// cloudinary: cloudinary,
// folder: "demo",
// allowedFormats: ["jpg", "png"],
// transformation: [{ width: 500, height: 500, crop: "limit" }]
// });

// const parser = multer({ storage: storage });

var app = express();
app.set('port', (process.env.PORT || 5000));

// var uri ='mongodb://shkamboj:qwerty123@localhost:27017/open_elec16?authSource=admin'; 
var uri = 'mongodb://amit:amit123@ds237072.mlab.com:37072/quizapp';

mongoose.connect(uri);

app.set('view engine', 'ejs');
app.set('views','./views');

var path = require('path');
app.use('/static',express.static(__dirname + '/public'));


app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['poiuytrewq'],
 
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set("view options", { layout: false } );
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

mailer.extend(app, {
  from: 'iiitu16118@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'iiitu16118@gmail.com',
    pass: 'PAPAmummy@143'
  }
});



// cloudinary.config({
// cloud_name: quizerapp,
// api_key: 118996875592891,
// api_secret: J47Z-EOJC5FPNfBxGXOtzzz50nM
// });




// app.get('/quizzer', function (req, res) {
//   delete req.session.uid;
//   res.redirect('https://quizzersh.herokuapp.com/');
// });

app.get('/xyz', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});

app.get('/', function (req, res) {
    res.render('main');
});

app.get('/just', function (req, res) {
    console.log(req.session.rollno);
});

// app.get('/images', function (req, res) {
//     res.render('img');
// });

// app.post('/images', parser.single("image"), (req, res) => {
//   console.log(req.file) // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;

//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });




app.get('/quizap', function(req, res) {
  if(req.session.rollno)
  {
    var list = quizzer.getCategories();
  console.log(list);

  // load the index.html template
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if(err) throw err;

    // populate it with templated questions from the node-quizzer module
    var compiled = _.template(data.toString());
    res.send(compiled({ availableQuizzes: list }));
  });
  }
  
});




app.use(express.static(path.join(__dirname, 'public')));

app.get('/quiz', function(req, res) {
  var quiz = getQuiz('generate', req);

  // load the quiz.html template
  fs.readFile(__dirname + '/public/quiz.html', function(err, data) {
    if(err) throw err;

    // populate it with templated questions from the node-quizzer module
    var compiled = _.template(data.toString());
    res.send(compiled({ quiz: quiz }));
  });
});

app.get('/tokenize', function(req, res) {
  var quiz = getQuiz('tokenize', req),
    tokenUrl = req.protocol + '://' + req.get('host') + "/quiz/" + quiz.quid;

  res.set('Content-Type', 'text/plain');
  res.send(tokenUrl);
});

app.get('/quiz/:id', function(req, res) {
  var quiz = quizzer.fromToken(req.params.id);

  // load the quiz.html template
  if(quiz) {
    fs.readFile(__dirname + '/public/quiz.html', function(err, data) {
      if(err) throw err;

      // populate it with templated questions from the node-quizzer module
      var compiled = _.template(data.toString());
      res.send(compiled({ quiz: quiz }));
    });
  } else {
    res.send("This token has expired!");
  }
})

app.get('/review', function(req, res) {
  var urlParts = url.parse(req.url, true),
    query = urlParts.query,
    results = quizzer.evaluate(query);
    uname = req.session.rollno;
    topic = results.stats.quiz['name'];
    total_ques = results.stats['total'];
    correct = results.stats['correct'];
    percentage = results.stats['perc'];
    var test = new Test({
    uname : uname,
    topic : topic,
    total_ques : total_ques,
    correct : correct,
    percentage : percentage
  });
    var code = new Code({
    uname : uname,
    total_ques : total_ques,
    correct : correct,
    percentage : percentage
  });
    if(topic == "nodejs")
    {
      code.save();
    }
    test.save(function (err){
    if(err)
    {
      console.log("ERRONN");
    }
  });
    console.log(results.stats['perc']);
    console.log(results.stats['total']);
    console.log(results.stats['correct']);
    console.log(results.stats.quiz['name']);
    console.log(req.session.rollno);

  // load the review.html template
  fs.readFile(__dirname + '/public/review.html', function(err, data) {
    if(err) throw err;

    // populate it with templated questions from the node-quizzer module
    var compiled = _.template(data.toString());
    res.send(compiled({ results: results }));
  });
});




app.get('/register', function (req, res)
{
    res.render('reg');
});

app.get('/home', function (req, res)
{
    res.render('main');
});


// app.get('/register', function (req, res)
// {
//     res.render('reg');s
// });


app.get('/fagnum',function(req,res){
   res.render('fagnum');
});

app.post('/fagnum', function(req,res){
  var fullname = req.body.fullname;
  var billby = req.body.billby;
  var billto = req.body.billto;
  var date = req.body.date;
  
  var pdfx = new Pdf({
    fullname : fullname,
    billby : billby,
    billto : billto,
    date : date,
  });

  const doc = new PDF();
  let filename = fullname;
  filename = encodeURIComponent(filename)+'.pdf';

  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  const content ="Billing of your order "+"\n"+"Name: "+ pdfx.fullname +"\n"+ "Bill By: "+pdfx.billby +"\n"+"Bill To: " + pdfx.billto +"\n"+ "Date: "+pdfx.date;
  doc.y = 300;

  doc.text(content, 50, 50);
  doc.pipe(res);
  doc.end();
  pdfx.save(function (err){
    if(err)
    {
      console.log("ERRONN");
    }
  });
});

app.get('/fac_signup',function(req, res){
  res.render('fac_signup');
})

app.post('/fac_signup',function (req,res) {
  var fname = req.body.fname;
  var teach_id = req.body.teach_id;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = passwordHash.generate(password);
  console.log(hashedPassword);
  var faculty = new Faculty({
    fname : fname,
    teach_id : teach_id,
    email : email,
    password : hashedPassword,
  });
  faculty.save(function (err) {
    if(err)
    {
      console.log("ERRONN");
    }
    else
    {
      alert('Successfully Registered.');
    }
  });
});

app.get('/fac_login',function(req,res){
   res.render('fac_login');
});


app.post('/fac_login',function (req,res) {
  var teach_id = req.body.teach_id;
  var password = req.body.password;
  Faculty.find({"teach_id" : teach_id },function(err,res2){
    // console.log(res2.length);
    // HP = res2[0].password;
    // console.log(HP);
    //   console.log( passwordHash.verify(password, res2[0].password));
         if(res2.length>0 && passwordHash.verify(password,res2[0].password))
         {
            console.log('OK');
            console.log(res2[0].teach_id);
            req.session.uid = 'string';
            res.redirect('/quiz');
         }
         else
         {
            alert('Wrong Details');
            res.redirect('/fac_login');
         }
          
});
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
      res.redirect('/signup');
    }
    else
    {
      res.redirect('/login');
    }
  });
});

app.get('/pdf',function(req,res){
   res.send('PDF');
});


app.get('/viewdata',(req , res) =>{
    Person.find().exec(function(err , i){
        if (err) return console.log(err);

        res.render('viewdata',{Person: i});
     })
 });


app.get('/leaderboard',(req , res) =>{
    Code.find().sort({percentage: 'desc'}).exec(function(err , i){
        if (err) return console.log(err);

        res.render('leader',{Code: i});
     })
 });




app.get('/myprofile',function (req,res) {

  Test.find({"uname" : req.session.rollno},function(err,res2){
         if(res2.length>0)
         {
            console.log('OK');
            res.render('myprofile',{Test: res2});
         }
         else 
         {
            res.redirect('login');
         }
          
});
});





app.get('/exam',(req , res) =>{
    Quizq.aggregate([{ $sample: { size: 2} }]).exec(function(err , i){
        if (err) return console.log(err);

        res.render('exam',{Quizq: i});
     })
 });

app.get('/login',function(req,res){
   res.render('login');
});


app.post('/login',function (req,res) {
  var rollno = req.body.rollno;
  var email = req.body.email;
  var password = req.body.password;
  Person.find({"rollno" : rollno },function(err,res1){
      // console.log( passwordHash.verify(password, res1[0].password));
         if(res1.length>0 && passwordHash.verify(password, res1[0].password))
         {
         	req.session.rollno = rollno;
            res.redirect('/quizap');
         }
         else
         {
            res.redirect('login');
         }
          
});
});

// app.get('/quiz',function(req,res){
	
// 	 if(req.session.uid)
// 		res.render('quiz');
//   else
//     res.send("YOu are not logged in");
   
// });


app.post('/quiz11',function(req, res){
    if(req.body.noq=="DBMS")
    res.redirect('/ten');
  else
    res.redirect('/dash2');
})

app.get('/ten',function(req,res){
  res.render('ten');
});

app.post('/ten',function (req,res) {
  var q1 = req.body.q1;
  var q11 = req.body.q11;
  var q12= req.body.q12;
  var q13 = req.body.q13;
  var q14 = req.body.q14;
  var anss = req.body.anss;
  var quizq = new Quizq({
    q1 : q1,
    q11 : q11,
    q12 : q12,
    q13 : q13,
    q14 : q14,
    anss : anss
  });

  quizq.save();
  res.redirect('ten');

});


app.get('/dash2',function(req,res){
  res.render('twenty');
});


app.get('/logout', function (req, res) {
  delete req.session.rollno;
  res.redirect('/');
});



// app.post('/forgot_password', function (req, res, next) {
//   var email1 = randomUrl('https');
//   console.log(email1);
//   app.mailer.send('email', {
//     to: req.body.email,
//     subject: 'Test Email',
//     otherProperty: 'Other Property'
//   }, function (err) {
//     if (err) {
//       console.log(err);
//       res.send('There was an error sending the email');
//       return;
//     }
//     res.send('Email Sent');
//   });
// });

app.get('/forgot_password',function(req, res){
  res.render('forgot_password');
});






app.post('/forgot_password',function(req, res){
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({


       from: 'iiitu16118@gmail.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: 'iiitu16118@gmail.com',
    pass: 'PAPAmummy@143'
  }
    });

    var mrl = randomUrl('https');

var text = 'please click on the link to change password: \n\n' + mrl;

    let mailOptions = {
        from: 'iiitu16118@gmail.com',
        to: req.body.email,
        subject: 'Reset Password',
        text: text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    else
    {
    var link = new Link({
    link: mrl,
    count: count
    });
    link.save(function (err){
    if(err)
    {
      console.log(err);
    }
    else
    {
      alert('Please Check Your Email');
      res.redirect('/mailsent');
    }
  });
  }
    });
});
});


app.get('/mailsent',function(req, res){
  res.render('mailsent');
});


app.get('/createquiz',(req , res) =>{
    Create.find().exec(function(err , i){
        if (err) return console.log(err);

        res.render('createquiz',{Create: i});
     })
 });





app.post('/createquiz',function (req,res) {
  var noq = req.body.noq;
  var quiz_name = req.body.quiz_name;
  var create = new Create({
    noq : noq,
    quiz_name : quiz_name
  });

  create.save();


});



app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});
