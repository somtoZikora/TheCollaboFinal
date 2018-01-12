/**
 * Created by opaluwa john on 12/8/2017.
 */

var User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// Used by signUpComponent
exports.postSignup = (req, res,next) => {

    var newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });


  // use model to create insert data into the db
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw  err;
      newUser.password = hash;
      newUser.save((err, user) => {
        if (err) {
          res.json({sucess: false, message: 'failed to register User'});
        } else {
          res.json({sucess: true, message: 'User Registered'});
        }
      });
    });
  });
};

//Used by signIn Component
exports.postAuthenticate = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  const query = {username: username}

  //load a user from database using username
  //User.getUserByUsername(username, (err, user) => {
  User.findOne(query, (err, user) => {
    if(err){
      throw error;
    }
    if(!user){
      return res.json({success: false, message: 'user not found'});
    }

    //Compare the password supplied in signIn form with
    //password of the user loaded from database
    bcrypt.compare(password, user.password, (err, isMatch) =>{
      if(err) throw err;
      if(isMatch){
        var token = jwt.sign({user}, process.env.JWT_SECRET, {
          expiresIn: 604800 //a week
        });
        res.json({
          success: true,
          token: 'bearer ' + token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, message: 'Wrong'});
      }
    })
  })
}

//Used by update-profile-InformationComponent
exports.postUpdateInfo = (req, res, next) => {

  //user model to update user in the db
  var query = {username:req.user.username}
  User.findOne(query,(err, doc)=>{
    if(err){
      throw err
    }

    doc.firstname = req.body.firstname;
    doc.lastname = req.body.lastname;
    doc.language =req.body.language;
    doc.courseofstudies =req.body.courseofstudies;
    doc.degree = req.body.degree;
    doc.save((err, doc, numAffected)=>{
      if(err){
      throw err
      }
      res.json({sucess: true, message: 'You Profile has been updated'});
    });
  });
}

// ********************************* would take out the components*********************************************************

//Used by ProfileComponent
exports.getMe = (req, res) => {
  //User.findOne({token: req.token}, (err, user) => {
  /*if(err){
   res.json({
   type: false,
   data: "Error occured: " + err
   })
   } else {*/
  res.json({
    user: req.user
  })
  // }
  // }   )
}

//Unused
exports.postSignIn = (req, res) => {
  User.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
    if(err){
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else if(user){
      res.json({
        type: false,
        data: "User already exists!"
      })
    } else {
      var userModel = new User;
      userModel.email = req.body.email,
        userModel.password = req.body.password
      userModel.save((err, user) => {
        user.token = jwt.sign(user, process.env.JWT_SECRET);
        user.save((err, user1) => {
          res.json({
            type: true,
            data: user1,
            token: user1.token
          })
        })
      })
    }
  })
}

// ***************************************************************************************************************
