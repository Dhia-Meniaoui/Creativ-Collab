var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new Schema({
    
    mail:{
        type:String,
    },
    role:{
        type:String,
    },
    about:{
        type:String
    }

});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user',UserSchema);
