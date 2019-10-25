const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true}
    // password:{type:String,required:true}
});

module.exports = mongoose.model('users',user);
//users is the name of the table (collection)
//.model is the built in method meaning schema