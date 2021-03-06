/**
 * Created by opaluwa john on 11/22/2017.
 */
var express = require('express');
var app = express();
var listOfStudyGroups = require('./models/Studygroup');  // to be used with socket.io

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

//var crypto = require('crypto');
//var socketioJwt = require('socketio-jwt');


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

mongoose.Promise = global.Promise
const connection = mongoose.connect(process.env.MONGODB_URI || undefined, {useMongoClient: true});
connection.once('error', (e) => {
  console.error(e, 'mongoose connection error.');
});
connection.once('connected', () => {
  console.log('mongoose connected');
});


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

app.post('/api/study-group/post-message',passport.authenticate('jwt', {session: false}), studyGroupController.postchatCommunicationPageComponent); // complete with websocket
app.post('/api/study-group/get-message',passport.authenticate('jwt', {session: false}), studyGroupController.getMessageToGroupComponent); // complete with websocket
app.post('/api/study-group/send-friend-invitation',passport.authenticate('jwt', {session: false}), studyGroupController.sendInvitationToFriend); //update this API both in client and server
app.post('/api/study-group/get-groupRandomNumber',passport.authenticate('jwt', {session: false}), studyGroupController.getGroupRandomNumber);

//unUsed
app.post('/user/signin', userController.postSignIn);

// ##############################################################################################################
// api-studygroup

app.post('/api/study-group/sign-up-with-group-name',passport.authenticate('jwt', {session: false}), studyGroupController.signUpWithGroupName);
app.post('/api/study-group/get-group-information',passport.authenticate('jwt', {session: false}), studyGroupController.getGroupAllInformation);

app.post('/api/study-group/post-confirm-friend-request-to-group',passport.authenticate('jwt', {session: false}), studyGroupController.postConfirmFriendRequestToGroupComponent);
app.post('/api/study-group/post-file-upload-to-group',multiparty,passport.authenticate('jwt', {session: false}), studyGroupController.postFileToGroupComponent);
app.get('/api/study-group/get-file-upload-to-group/:fileName',passport.authenticate('jwt', {session: false}), studyGroupController.readFileToGroupComponent);
app.post('/api/study-group/post-file-update-to-group',passport.authenticate('jwt', {session: false}), studyGroupController.postUpdateFileComponent);

// ##############################################################################################################

/* Send all other requests to angular app */
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../dist/index.html' ))
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//server.listen(port)

// ################################Delete if it does not work##############################################################################
/*global.userSessions = {};


function checkWebSocketAuthToken(websocketoken, callback){
  var sendWebSocketTokenToUser = true
  if(websocketoken == userSessions[websocketoken] ){
  sendWebSocketTokenToUser = false
  callback(sendWebSocketTokenToUser, websocketoken)
}else{
  var newWebSocketToken = crypto.randomBytes(64).toString('base64');
  userSessions[newWebSocketToken] = newWebSocketToken
  sendWebSocketTokenToUser = true
    callback(sendWebSocketTokenToUser, newWebSocketToken)
}

}

io.use(function(socket,next ){
  socketioJwt.authorize({
  secret: process.env.JWT_SECRET,
  handshake: true
})
next();
}
);

// ##############################################################################################################


io.sockets.on('connection', (socket)=>{
  console.log('new Connection made')
  //console.log(socket.handshake.query.token)

  socket.auth = false;
   socket.on('authenticate', function(data){
     console.log(data.authToken)
     checkWebSocketAuthToken(data.websocketToken, function(sendWebSocketTokenToUser, newWebSocketToken){
       if (sendWebSocketTokenToUser == true){
         //socket.auth = true;
           io.emit('saveWebSocketToken', newWebSocketToken)
       }
     });
   });


  socket.on('send-message', (data)=>{
    io.emit('message-received', data)
  })

})
*/
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

server.listen(port)

global.userSessions = {};


io.sockets.on('connection', (socket)=>{
  console.log('new Connection made')

  socket.on('authenticate', (data)=>{

    try {
    var decoded = jwt.verify(data.token.replace(/^bearer\s/, ''), process.env.JWT_SECRET);
    random = data.groupRandomNumber
      socket.join(data.groupRandomNumber)
      socket.on('send-message', (data)=>{
        io.sockets.in(data.groupRandomNumber).emit('message-received', data)
      })

    } catch(err) {
      console.log(err)
    }

});
})
