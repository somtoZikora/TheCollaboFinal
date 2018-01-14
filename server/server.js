/**
 * Created by opaluwa john on 11/22/2017.
 */
var express = require('express');
var app = express();

// Allow cross site origin
app.use(function(req, res, next, error) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var server = require('http').createServer(app);
var io =require('socket.io').listen(server)

// Middle ware to Allow API request from different domains

var path = require('path');
var bodyParser = require('body-parser');

const mongoose = require('mongoose')
const expressValidator = require('express-validator');
const passport = require('passport');

var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var passportCofig = require('./config/passport');
//var cors = require('cors');

var multiparty = require('connect-multiparty')();

/**
 * load enviroment variables into process
 */
const dotenv = require('dotenv').config();

/**
 * controllers(route handlers)
 */
const contactController = require('./controllers/contact');
const userController = require('./controllers/user');
const studyGroupController = require('./controllers/studygroups');

var port = 3000;

//app.use(cors());


/*connect to mongo db*/
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('error', (err)=>{
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running')
})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));




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
app.post('/user/update-info',passport.authenticate('jwt', {session: false}), userController.postUpdateInfo);
app.post('/user/contact', contactController.postContact);

//confirm if it used
app.get('/user/profile',passport.authenticate('jwt', {session: false}),passport.authenticate('jwt', {session: false}), userController.getMe);
// +++++++++++++++++++++++++Placed in component but not fully tested+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/api/study-group/list-of-study-groups',passport.authenticate('jwt', {session: false}), studyGroupController.getListOfStudyGroups);
app.post('/api/study-group/get-summary-group-information', studyGroupController.getSummaryOfGroupInformation);
app.post('/api/study-group/post-friend-request-to-group',passport.authenticate('jwt', {session: false}),passport.authenticate('jwt', {session: false}), studyGroupController.postFriendRequestToGroupComponent);
app.post('/api/study-group/create-study-group',passport.authenticate('jwt', {session: false}), studyGroupController.postCreateStudyGroup);
app.get('/api/study-group/get-users-study-groups',multiparty,passport.authenticate('jwt', {session: false}), studyGroupController.getUserGroups);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//unUsed
app.post('/user/signin', userController.postSignIn);

// ##############################################################################################################
// api-studygroup
app.post('/api/study-group/send-friend-invitation',passport.authenticate('jwt', {session: false}), studyGroupController.sendInvitationToFriend);
app.post('/api/study-group/sign-up-with-group-name',passport.authenticate('jwt', {session: false}), studyGroupController.signUpWithGroupName);
app.post('/api/study-group/get-group-information',passport.authenticate('jwt', {session: false}), studyGroupController.getGroupAllInformation);
app.post('/api/study-group/post-message',passport.authenticate('jwt', {session: false}), studyGroupController.postSendMessageToGroupComponent);
app.post('/api/study-group/get-message',passport.authenticate('jwt', {session: false}), studyGroupController.getMessageToGroupComponent);
app.post('/api/study-group/post-confirm-friend-request-to-group',passport.authenticate('jwt', {session: false}), studyGroupController.postConfirmFriendRequestToGroupComponent);
app.post('/api/study-group/post-file-upload-to-group',multiparty,passport.authenticate('jwt', {session: false}), studyGroupController.postFileToGroupComponent);
app.get('/api/study-group/get-file-upload-to-group/:fileName',passport.authenticate('jwt', {session: false}), studyGroupController.readFileToGroupComponent);
app.post('/api/study-group/post-file-update-to-group',passport.authenticate('jwt', {session: false}), studyGroupController.postUpdateFileComponent);

// ##############################################################################################################
/* Send all other requests to angular app */
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../dist/index.html' ))
})

server.listen(port)
io.sockets.on('connection', (socket)=>{
  console.log('new Connection made')

  socket.on('send-message', (data)=>{
    //console.log(data.text);
    io.socket.emit('message-received', data)
  })

})

/*app.listen(port, function(){
  console.log('Server started on port '+port);
});*/
