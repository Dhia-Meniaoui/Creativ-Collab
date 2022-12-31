var express = require('express');
const  router = express.Router();
const {ensureGuest , ensureAuth} = require('../middleware/auth');
const event = require('../models/events');


// /* GET home page. */
// router.get('/', ensureGuest,(req, res) => {
//   res.render('login');
// });

router.get('/dashboard', ensureAuth, async (req , res) => {
  try {
    const events = await event.find({user : req.user.name}).lean();
    res.render('dashboard' , {
      name : req.user.name,
      events
    });
  } catch (err) {
    console.log(err);
  }
  


var auth = require('../authentificate');
/* GET home page. */ 
router.get('/first', function(req, res, next) {
  res.render('index', { title: 'FIrst' });
});

router.get('/second', auth.verifyUser,function(req, res, next) {
  res.render('index', { title: 'Express' });
});


} )
module.exports = router;
