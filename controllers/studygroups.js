/**
 * Created by opaluwa john on 12/21/2017.
 */
var listOfStudyGroups = require('../models/Studygroup')
exports.getListOfStudyGroups = (req, res) =>{
  listOfStudyGroups.find({}, (err, studygroup) =>{
    if(err){
      throw err;
    }
      res.json(studygroup)
  })
}
