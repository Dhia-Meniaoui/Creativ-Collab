var express = require('express');
var router = express.Router();
const {ensureGuest , ensureAuth} = require('../middleware/auth');
const event = require('../models/events');


//show add page 
//route get events add
router.get('/dashboard', ensureAuth, async (req , res) => {


});




module.exports = router;
