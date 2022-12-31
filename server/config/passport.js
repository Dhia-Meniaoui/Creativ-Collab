const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new googleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,   
        clientsecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : 'auth/google/callback'
    },
    async (accessToken, refreshToken , profile , done) => {
      const newUser = {
        name : profile.name,
        googleId : profile.googleId,
        email : profile.email, 
        password : profile.password, 
        introduction : profile.introduction ,
        lieu : profile.lieu,
        coverphoto : profile.coverphotot, 
        photo : profile.photo,
        createdate : profile.createdate
    }
    try {
        let user = await User.findOne({googleId : profile.googleId});

        if (user){
            done(null, user )
        }
        else{
          user = new User.create(newUser)
          done(null , user )
        }
    } catch (err) {
        console.log(null, user.id)
    }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      }); 
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user)
        );
      });
}