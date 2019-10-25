const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/signup',{
    useNewUrlParser:true
});
const user = new User({
    name:'aftab',
    email:'myEmail@mail.com',
    password:'myPassword'
});

user.save();