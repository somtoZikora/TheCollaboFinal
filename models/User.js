/**
 * Created by opaluwa john on 12/8/2017.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password:{
    type: String,
    required: true
  },
  token: String,
  firstname: String,
  lastname: String,
  language: String,
  courseofstudy: String,
  degree: String
});
const  User = module.exports =mongoose.model('User', UserSchema);
//module.exports = User

/*module.exports.addUser = (newUser, callback) => {
bcrypt.genSalt(10, (err, salt) =>{
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if(err) throw  err;
    newUser.password = hash;
    newUser.save(callback);
  });
});
}*/

module.exports.getUserById = (id, callback) =>{
  User.findById(id, callback);
}


/*module.exports.getUserByUsername = (username, callback) => {
  const query = {username: username}
  User.findOne(query, callback);
}*


/*module.exports.comparePassword = (candidatePassword, hash, callback) =>{
  bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
    if(err) throw err;
    callback(null, isMatch);
  })
}*/
