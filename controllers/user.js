/**
 * Created by opaluwa john on 12/8/2017.
 */

var User = require('../models/User');

exports.postSignup = (req, res,next) => {
    if(req.body.email &&
     req.body.username &&
      req.body.password )
  {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
  }

  // use model to create insert data into the db
  User.create(userData, (err, user) =>{
    if(err){
      return next(err)
      console.log('alert error')
    }else{
      res.send({signup: true})
    }
  })
};

exports.postUpdateInfo = (req, res, next) => {
  var updatedUserData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    language: req.body.language,
    courseofstudies: req.body.courseofstudies,
    degree: req.body.degree
  }

  //use model to update user in the db
  User.findOne({username:'john'},(err, doc)=>{
    if(err){
      console.log(err)
    }
    doc.firstname = updatedUserData.firstname;
    doc.lastname = updatedUserData.lastname;
    doc.language =updatedUserData.language;
    doc.courseofstudies =updatedUserData.courseofstudies;
    doc.degree = updatedUserData.degree;
    doc.save((err, doc, numAffected)=>{
      if(err){
        console.log(err)
      }
    });
  });
}

