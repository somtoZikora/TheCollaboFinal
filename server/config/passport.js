/**
 * Created by opaluwa john on 12/10/2017.
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

exports.strategy = (passport) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET
  opts.authScheme= 'bearer'
  passport.use(new JwtStrategy(opts,function (jwt_payload, done) {
    User.getUserById(jwt_payload.user._id, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user); // uncomment if below does not work
      }else {
        return done(null, false);
      }
    });
  }))

  passport.serializeUser(function (user, done) {
      done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
      var user = USERS[id];
      done(null, user);
  });
}


exports.ensureAuthorized = (req, res, next) => {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if(typeof  bearerHeader !== 'undefined'){
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else {
    res.send(403)
  }
}
