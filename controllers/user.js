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

  // use schema to create insert data into the db
  User.create(userData, (err, user) =>{
    if(err){
      return next(err)
      console.log('alert error')
    }else{
      res.send({signup: true})
    }
  })
};

