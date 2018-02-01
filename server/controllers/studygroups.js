/**
 * Created by opaluwa john on 12/21/2017.
 */
var listOfStudyGroups = require('../models/Studygroup');
var User = require('../models/User')
const nodemailer = require('nodemailer');

const passport = require('passport');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

//************************************************************************************************
var mongoose = require('mongoose');
const fs = require('fs');
var Gridfs = require("gridfs-stream");
//*********************************************************************************************

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var path = require('path');
var multer = require('multer');
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file,  cb){
    cb(null, req.body.groupName + '-' + file.originalname + '-' +path.extname(file.originalname))
  }
})

//init storage
var upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('file')

// check file type
function checkFileType(file, cb){
  // allowed extension
  const filetypes = /jpeg|jpg|png|gif|pdf/
// check extension
const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//check mimetype
const mimetype = filetypes.test(file.mimetype)
if(mimetype && extname){
  return cb(null, true);
}else {
  cb('Error: Images and pdf only')
}
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// used in ListOfStudyGroupComponent
exports.getListOfStudyGroups = (req, res) =>{
  var query = listOfStudyGroups.find({}).select('groupName');

  query.exec(function (err, someValue) {
      if (err) return next(err);
      res.send(someValue);
  });
}

// #####################################################################################
// used in createStudyGroupsComponent
exports.postCreateStudyGroup = (req, res) =>{

  req.checkBody("groupName", "You did not enter any name for study group").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
   return res.send(errors);
  }

  var groupRandomNumber = crypto.randomBytes(64).toString('base64');

    var newStudyGroup = new listOfStudyGroups({
      groupName: req.body.groupName,
      groupRandomNumber:groupRandomNumber
    })

  //Save new group
  newStudyGroup.save((err, groupName) => {
    if(err){
     return res.json({success: false, message: 'Failed to create group'})
    }


    User.findOne({username:req.user.username}, (err, user) => {
      if (err) console.log(err)
      if (!user) return res.json({success:false, message: 'Error occured'})

          //add User Id to group and save(referncing)
          groupName.groupMembers.push(user._id);
          groupName.save((err, group) => {
            if (err) throw err;
            if(!group) return res.json({success:false, message: 'Error trying to add user to group'})
            User.findOne({username: user.username}).populate('groupMembers').exec(function (err, story) {
                if (err) return handleError(err);
              res.json({success: true, message: 'study group created and User Id added to Study Group'} )
              }
            )
          })
    })


  })

}

// used in sendInvitationToFriendComponent
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

exports.sendInvitationToFriend = (req, res) => {
  groupName = req.body.groupName;
  host =req.get('host');
  link ="http://"+req.get('host')+"/login?id="+groupName;

  console.log('this is the link'+ link)

  mailOptions = {
    to: req.body.friendsEmail,
    subject:"Please confirm your email account",
    html: "Hello, <br> Please click on the link to verify your email." +
    "<br><a href="+link+">Click here to verify</a> "
  }


  smtpTransport.sendMail(mailOptions, (error, response) => {
    if(error){
      console.log(error) ;
      res.send(error)
    }else{
      res.json({'success': true, 'message':'sent'});
    }
  })

}


//used in the signUpWithGroupComponent
exports.signUpWithGroupName = (req, res) => {

  var newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    groupName: req.body.groupName
  });

  var newStudyGroup = new listOfStudyGroups({
    groupName: req.body.groupName
  })

  // use User model to create insert data into the db and studyGroup model to create insert data into the db
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw  err;
      newUser.password = hash;
      newUser.save((err, user) => {
        if (err) return res.json({sucessAboutUser: false, message: 'failed to register User'});

        listOfStudyGroups.findOne({groupName:req.body.groupName}, (err, group) => {
          if(err) return res.json({successAboutGroup: false, message: 'Error Occured while fetching group'})
          if(!group) return res.json({successAboutGroup: false, message: 'group not found'})

          group.groupMembers.push(user._id);
          group.save((err, newGroup) =>{
            if (err){
              return res.json({successAboutSavingGroupMember: false, message: 'Group member not saved'})
            }

            listOfStudyGroups.findOne({groupName:req.body.groupName}).populate('groupMembers').
            exec(function (err, story) {
              if (err) return handleError(err);
              res.json({success: true, message: "'User Registered and added to study group'"} )
            });
          })

        })

      });
    });
  });

}

//used in the getGroupInformationComponent(For the dashboard)
exports.getGroupAllInformation = (req, res) => {

  var groupName = req.body.groupName;
  var arrOfUsername = []

  const query = {groupName: groupName}

  //load a group from database using groupName
  listOfStudyGroups.findOne(query).populate('groupMembers').populate().populate().
  exec((err,popluatedGroup) => {

    if(err) return res.writeHead(500, err.message)
    if(!popluatedGroup) return res.json({success: false, message: 'Error while populating group'});

    res.json({
      success: true,
      message: 'group found',
      group: popluatedGroup
    })

  })

}


//used in getSummaryOfGroupInformationComponent and ChatComponent
exports.getSummaryOfGroupInformation = (req, res) => {

  var groupName = req.body.groupName;
  var arrOfUsernames = []

  const query = {groupName: groupName}

  //load a group from database using groupName
  listOfStudyGroups.findOne(query).populate('groupMembers').
  exec((err, populatedGroup) => {
    if(err){
      throw error;
    }
    if(!populatedGroup){
      return res.json({success: false, message: 'group not populated'});
    }
    populatedGroup.groupMembers.forEach(groupMember => {
      arrOfUsernames.push(groupMember.username)
    } )

    res.json({
      success: true,
      message: 'group found',
      groupName: populatedGroup.groupName,
      groupMembers: arrOfUsernames
    })

  } )

}

// used in chatCommunicationPageComponent
exports.postchatCommunicationPageComponent = (req, res)=> {

  var query = {groupName: req.body.groupName}
  listOfStudyGroups.findOne(query, (err, studyGroup) => {
    if(err) throw err
    if(!studyGroup) return res.json({success: false, message: 'You dont belong to any group'})
    studyGroup.messages.push({sender:req.user.username, message: req.body.message})
    studyGroup.save((err, studyGroup) =>{
      if (err) throw err
      if(!studyGroup) return res.json({success: false, message: 'Message not save'})
      res.json({
        success: true,
        messages: studyGroup.messages})
    })
  })

}

// used in sendMessageToGroupComponent
exports.getMessageToGroupComponent = (req, res) => {
  var query = {groupName: req.body.groupName}
listOfStudyGroups.findOne(query, (err, studyGroup) => {
  if (err) throw err
  if(!studyGroup) return res.json({success: false, message: ' You dont belong to any group'});
  res.json({
    success: true,
    messages: studyGroup.messages
  })
})
}

// Used by post friend request getinformationAboutStudyGroupComponent
exports.postFriendRequestToGroupComponent = (req, res)=> {

  req.checkBody("groupName", "You did not enter any name for study group").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
   return res.json({success:false, message: errors[0].msg});
  }

  var query = {groupName: req.body.groupName}
  listOfStudyGroups.findOne(query, (err, studyGroup) => {
    if(err) throw err
    if(!studyGroup) return res.json({success: false, message: 'Error occured while trying to fetch user group'})

    User.findOne({username:req.user.username}, (err, user) => {
      if (err) console.log(err)
      if (!user) return res.json({success:false, message: 'Error occured'})

          //add User Id to intended and save(referncing)
          studyGroup.intendedFriends.push(user._id);
          studyGroup.save((err, group) => {
            if (err) throw err;
            if(!group) return res.json({success:false, message: 'Error trying to add user to intendedFriends'})
            listOfStudyGroups.findOne(query).populate('intendedFriends').exec(function (err, story) {
                if (err) return handleError(err);
              res.json({success: true,
                message: 'You friend request has been sent'} )
              }
            )
          })
    })
  })

}


// used in postConfirmFriendRequestToGroupComponent
exports.postConfirmFriendRequestToGroupComponent = (req, res) => {
  var query = {groupName: req.body.groupName}
listOfStudyGroups.findOne(query, (err, studyGroup) => {
  if (err) throw err
  if(!studyGroup) return res.json({success: false, message: ' You dont belong to any group'});

  User.findOne({username:req.body.intendedGroupMember}, (err, user) => {
    if (err) console.log(err)
    if (!user) return res.json({success:false, message: 'Error occured'})

        //Remove user from intended group
        var index = studyGroup.intendedFriends.indexOf(user._id);
        if (index > -1) {
          studyGroup.intendedFriends.splice(index, 1);
          studyGroup.groupMembers.push(user._id);
          studyGroup.save((err, group) => {
            if (err) throw err;
            if(!group) return res.json({success:false, message: 'Error trying to add user to group'})
            listOfStudyGroups.findOne(query).populate('groupMembers').exec(function (err, story) {
                if (err) return handleError(err);
              res.json({success: true,
                message: 'user added to group'} )
              }
            )
          })
          }
  })
})
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.postFileToGroupComponent = (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.json({success: false, message: err})
    }else {
      if(req.file == undefined) return res.json({success: false, message: 'error no file selected'})
      // console.log("this is the group name" + req.body.groupName)
      listOfStudyGroups.findOne({groupName:req.body.groupName}, (err, group) =>{
        if (err) throw error
        if(!group) return res.json({success:false, message: 'failed to add file to the group'})
        group.dashboard.pastExams.push({name:req.file.filename,
        solved:true,
        fileURL: req.file.path})
        group.save((err,data) =>{
          if (err) throw err
           res.json({success:true, message: 'file added to user group'})
        })
      })
    }
  })
}




exports.readFileToGroupComponent = (req, res, next) => {

   var options = {
      root: './uploads/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

      var fileName = req.params.fileName;

     listOfStudyGroups.findOne({groupName: req.body.groupName}, (err, group) => {
        if(err) throw err
        if(!group) return res.json({success:false, message:'please ensure you belong to a group'})

       group.dashboard.pastExams.forEach((exams)=>{
          if(exams.name == fileName){
            res.sendFile(fileName, options, function (err) {
              if (err) {
                next(err);
              } else {
                console.log('Sent:', fileName);
              }
            });
          }
        })
      })

}

exports.postUpdateFileComponent = (req, res) => {

  upload(req, res, (err) => {
    if(err){
      res.json({success: false, message: err})
    }else {
      if(req.file == undefined) return res.json({success: false, message: 'error no file selected'})
      // console.log("this is the group name" + req.body.groupName)
      listOfStudyGroups.findOne({groupName:req.body.groupName}, (err, group) =>{
        if (err) throw error
        if(!group) return res.json({success:false, message: 'failed to add file to the group'})
        group.dashboard.pastExams.push({name:req.file.filename,
        solved:true,
        fileURL: req.file.path})
        group.save((err,data) =>{
          if (err) throw err
           res.json({success:true, message: 'file added to user group'})
        })
      })
    }
  })

}


exports.getUserGroups = (req,res) =>{

  var queryInput = {
    groupMembers:{$all:[ mongoose.Types.ObjectId(req.user._id)]}
  }

  var query = listOfStudyGroups.find(queryInput).select('groupName');

  query.exec(function (err, someValue) {
      if (err) return next(err);
      res.send(someValue);
  });

}

exports.getGroupRandomNumber = (req,res) =>{

  var queryInput = {
    groupName: req.body.groupName
  }

  var query = listOfStudyGroups.findOne(queryInput).select('groupRandomNumber');

  query.exec(function (err, groupRandomNumber) {
      if (err) return next(err);
      res.send(groupRandomNumber);
  });

}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ##############################################################################################
