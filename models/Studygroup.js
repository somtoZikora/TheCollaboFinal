/**
 * Created by opaluwa john on 12/21/2017.
 */
/**
 * Created by opaluwa john on 12/8/2017.
 */
/*var mongoose = require('mongoose');
var StudyGroupSchema = mongoose.Schema({
  groupName: String,
  groupMembers: []
});
const  StudyGroup = module.exports =mongoose.model('StudyGroup', StudyGroupSchema);
*/

/**
 * Created by opaluwa john on 12/21/2017.
 */
/**
 * Created by opaluwa john on 12/8/2017.
 */
var mongoose = require('mongoose');
var StudyGroupSchema = mongoose.Schema({
  groupName: { type : String , unique : true },
  groupMembers: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User'}],
  messages: [{sender: String, message: String}],
  intendedFriends: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User'}],

  dashboard:{
    pastExams:[{
      name: String,
      solved: Boolean,
      fileURL: String
    }],
    assignments:[{
      name: String,
      solved: Boolean,
      fileURL: String
    }]
  }
});
const  StudyGroup = module.exports =mongoose.model('StudyGroup', StudyGroupSchema);
