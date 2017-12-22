/**
 * Created by opaluwa john on 12/21/2017.
 */
/**
 * Created by opaluwa john on 12/8/2017.
 */
var mongoose = require('mongoose');
var StudyGroupSchema = mongoose.Schema({
  name: String
});
const  StudyGroup = module.exports =mongoose.model('StudyGroup', StudyGroupSchema);


