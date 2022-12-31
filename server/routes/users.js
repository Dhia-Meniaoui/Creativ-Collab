const User = require('../models/user');
const _= require('lodash');
const { JSONCookie } = require('cookie-parser');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var cors = require('./cors');
const bodyParser = require('body-parser');
var authenticate = require('../authentificate');
var passport = require('passport');

router.use(bodyParser.json());

const serviceRouter = express.Router();
serviceRouter.use(bodyParser.json());


router.get('/getUserById/:id',cors.corsWithOptions,(req,res,next)=>{
//.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  User.findById(req.params.id)
    .then((resp)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(resp);
  },(err)=>next(err))
  .catch((err)=>next(err))
});
router.post('/signup',cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), //refister() by passport mongoose plugin
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.mail)
        user.mail = req.body.mail;
      if(req.body.role)
        user.role = req.body.role;
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
      
    }
  });
});
//use passpoert.authentificate as a middlware // only req and res
router.post('/login', passport.authenticate('local'), (req, res) => {
  //create token and
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token: token,status: 'You are successfully logged in!'});
});

//login page 
router.get('/loginByGmail', (req , res )=> res.send('login'));

//register page 
router.get('/registerByGmail', (req ,res) => res.send('register'));


//post the user 
router.post('/registerByGmail2',async (req ,res )=> {
  
  let newUser = new User(_.pick(req.body , ['name', 'email','password' ,'introduction', 'lieu' , 'coverPhoto','photo']));

  //hashing the password 
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password , salt );
   
  console.log(_.pick(newUser , ['name', 'email','password' ,'introduction', 'lieu' , 'coverPhoto','photo']));
  newUser.save();
});



module.exports = router;
