const _= require('lodash');
const { JSONCookie } = require('cookie-parser');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const joi = require('joi');
const user = require('../models/user');

const passport = require('passport');


//route get/auth/google  
router.get('/google', passport.authenticate('google', {scope: ['profile']}));


//route get/auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', {failureRedirect : '/'}),
    (req , res) => {
        redirect('/dashboard')
    }
)


//route get/auth/logout 
router.get('/logout', (req , res )=>{
    req.logout()
    res.redirect('/');
})


module.exports = router;





// //post the user 
// router.post('/register',async (req ,res )=> {
// const { error } = validate(req.user)

// let newUser = new User(_.pick(req.body , ['name', 'email','password' ,'introduction', 'lieu' , 'coverPhoto','photo']));

// //hashing the password 
// const salt = await bcrypt.genSalt(10);
// newUser.password = await bcrypt.hash(newUser.password , salt );

// console.log(_.pick(newUser , ['name', 'email','password' ,'introduction', 'lieu' , 'coverPhoto','photo']));
// newUser.save();

// const validPassword = await bcrypt.compar(req.body.password, user.password);
// if(!validPassword) return res.status(400).send('invalid password or email');

// res.send(true);
// });