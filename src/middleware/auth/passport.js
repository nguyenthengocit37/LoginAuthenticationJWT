const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const {MY_CLIENT_ID,MY_CLIENT_SECRET} = require('../../config/passportGoogle');


passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: MY_CLIENT_ID,
    clientSecret: MY_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));
const passportGoogle =   passport.authenticate( 'google', {failureRedirect: '/google/failure'});

module.exports = passportGoogle;