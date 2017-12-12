/**
 * Created by opaluwa john on 11/22/2017.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
const mongoose = require('mongoose')
const expressValidator = require('express-validator');
const passport = require('passport');

var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var passportCofig = require('./config/passport');
var cors = require('cors');

/**
 * load enviroment variables into process
 */
const dotenv = require('dotenv').config();

/**
 * controllers(route handlers)
 */
const contactController = require('./controllers/contact');
const userController = require('./controllers/user')

var port = 3000;
var app = express();

/*connect to mongo db*/
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', (err)=>{
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running')
})

//View Engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Middle ware to Allow API request from different domains
app.use(cors());

// Middle ware Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

//Middle ware passport
app.use(passport.initialize());
app.use(passport.session());

passportCofig.strategy(passport);

app.post('/user/signup', userController.postSignup);
app.post('/user/authenticate', userController.postAuthenticate);
app.get('/user/profile',passport.authenticate('jwt', {session: false}), userController.getMe);

app.get('/user/contact', contactController.getContact);
app.post('/user/contact', contactController.postContact);


app.post('/user/update-info', userController.postUpdateInfo);
app.post('/user/signin', userController.postSignIn);


/* Send all other requests to angular app */
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/index.html' ))
})

app.listen(port, function(){
  console.log('Server started on port '+port);
});
