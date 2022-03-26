const dotenv = require('dotenv');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const {auth} = require('../../config/passport');

//Config passport Facebook

passport.use(new FacebookStrategy({
  clientID: auth.facebook.FACEBOOK_CLIENT_ID,
  clientSecret: auth.facebook.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: [ 'email', 'displayName', 'photos'],
},
function(accessToken, refreshToken, profile, done) {
   return done(null, profile);
}
));
const passportFacebook = passport.authenticate('facebook', { failureRedirect: '/login' });
const passportFacebookMain = passport.authenticate('facebook', {scope: 'email'});
//Config passport Google
passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: auth.google.GOOGLE_CLIENT_ID,
    clientSecret: auth.google.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));
const passportGoogle =   passport.authenticate( 'google', {failureRedirect: '/google/failure'});
const passportGoogleScope = passport.authenticate('google', { scope:[ 'email', 'profile' ] });
module.exports = {passportGoogle,passportGoogleScope,passportFacebook,passportFacebookMain};