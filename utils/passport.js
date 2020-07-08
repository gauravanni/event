const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const passport = require('passport')
const User = require('../models/User')

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    User.findById(id).then(user => {
        cb(null, user);
      });
});


module.exports = function (passport) {
    // google strategy
    passport.use(new GoogleStrategy({
        clientID: '1001269359879-gsncugmvv0mevmjjpn32apin633cah7j.apps.googleusercontent.com',
        clientSecret: 'iPLNycB5M1bPv3IYlwOJfYMH',
        callbackURL: "http://localhost:8000/auth/google/callback",
        proxy: true
    },
        function (accessToken, refreshToken, profile, cb) {
            User.findOne({ 'google.googleId': profile.id }).then(existingUser => {
                if (existingUser) {
                  cb(null, existingUser);
                } else {
                  const {id,displayName,photos}=profile;
                  let obj={ 
                      google:{
                          googleId:id,
                          name:displayName,
                          picture:profile._json.picture,
                          createdAt:Date.now()
                        } 
                    }
                  new User(obj)    
                    .save()
                    .then(user => cb(null, user));
                }
              });
        }
    ));

    // facebook
    passport.use(new FacebookStrategy({
        clientID: '1198826890516205',
        clientSecret: '963f1ee4e9c198ec1dd7d09e1be5ad98',
        callbackURL: "http://localhost:8000/auth/facebook/callback",
        proxy: true
    },
        function (accessToken, refreshToken, profile, cb) {
            User.findOne({ 'facebook.facebookId': profile.id }).then(existingUser => {
                if (existingUser) {
                  cb(null, existingUser);
                } else {
                  const {id,displayName,photos}=profile;
                  let obj={ 
                    facebook:{
                        facebookId:id,
                          name:displayName,
                          picture:profile._json.picture,
                          createdAt:Date.now()
                        } 
                    }
                  new User(obj)    
                    .save()
                    .then(user => cb(null, user));
                }
              });
        }
    ));

    
}
