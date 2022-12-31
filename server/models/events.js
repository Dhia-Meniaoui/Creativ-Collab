const mongoose= require('mongoose');


const event = mongoose.model('event',new mongoose.Schema({
    name: {
        type: String,
        require: true,
    } ,
    introduction: {
        type: String
    } ,
    lieu : {
        type: String,
        require: true,
    } , 
    Photo: {
        type: String,
        require: true,
    } ,
    date: {
        type : Date, 
    }


}) );

module.exports = event;

