/**
 * Created by opaluwa john on 12/21/2017.
 */
var listOfStudyGroups = require('../models/Studygroup');
var User = require('../models/User')
const nodemailer = require('nodemailer');

const passport = require('passport');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// used in ListOfStudyGroupComponent
exports.getListOfStudyGroups = (req, res) =>{
  listOfStudyGroups.find({}, (err, studygroup) =>{
    if(err){
      throw err;
    }
      res.json(studygroup)
  })
}

// #####################################################################################
// used in createStudyGroupsComponent
exports.postCreateStudyGroup = (req, res) =>{

  req.checkBody("groupName", "You did not enter any name for study group").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
   return res.send(errors);
  }

    var newStudyGroup = new listOfStudyGroups({
      groupName: req.body.groupName
    })

  //Save new group
  newStudyGroup.save((err, groupName) => {
    if(err){
     return res.json({success: false, message: 'Failed to create group'})
    }


    User.findOne({username:req.body.username}, (err, user) => {
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

  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if(error){
      console.log(error) ;
      res.send(error)
    }else{
      console.log("Message sent: "+ response.message);
      res.end("sent");
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


//used in getSummaryOfGroupInformationComponent
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

// used in sendMessageToGroupComponent
exports.sendMessageToGroupComponent = (req, res)=> {

  var query = {groupName: req.body.groupName}
  listOfStudyGroups.findOne(query, (err, studyGroup) => {
    if(err) throw err
    if(!studyGroup) return res.json({success: false, message: 'You dont belong to any group'})
    studyGroup.messages.push({sender:req.body.username, message: req.body.message})
    studyGroup.save((err, studyGroup) =>{
      if (err) throw err
      if(!studyGroup) return res.json({success: false, message: 'Message not save'})
      res.json({
        success: true,
        messages: studyGroup.messages})
    })
  })

}


// ##############################################################################################

