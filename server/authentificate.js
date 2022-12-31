var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy; // provide a jwt strategy
var ExtractJwt = require('passport-jwt').ExtractJwt; // extractJWT
var jwt = require('jsonwebtoken'); // JWT module 
var config = require('./config.js');


passport.use(new LocalStrategy(User.authenticate())); // auth() by passport-Local-Mongoose instead of write it by yourself 
passport.serializeUser(User.serializeUser());  // to be stored 
passport.deserializeUser(User.deserializeUser()); // to extract information when request comes to the server

// use jwt module to create the token and give it to us 
//user : json object && a payload for token
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

// declare a variable to specify the options for JWT based strategy
var opts = {};
// specify how we are going to extract our jwt from upcoming request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// the sec parameter : suppy the secret key 
opts.secretOrKey = config.secretKey;

//export the strategy that we gonna use (specify the local strategy earlier)
// take opts as 1st parameter // 2nd verify funct 
// done to passing back the information to passport 
//in order to load things into the request msg after extracting the token
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));


//verify an income user and authenticate it based on token
exports.verifyUser = passport.authenticate('jwt',{session: false});