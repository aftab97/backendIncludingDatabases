// import { fstat } from "fs";

const hbs = require('express-handlebars');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');


mongoose.connect('mongodb://localhost:27017/signup',{
    useNewUrlParser:true
});


app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Getting the directory name of the path

app.engine('.hbs',hbs({
    //defaultlayout will grab the layout.hbs page and incorporate this in as the basic template of all the 
    //other pages 
    
    defaultLayout: 'layout',
    //Searching for the layout.hbs file to get  layout
    extname: '.hbs'
}));

//Setting the view to what is specified in the .hbs
app.set('view engine', '.hbs');

//this routes everything to the homepage
app.get('/',(req, res) =>{
 res.render('index')
});

// this routes everything to the about page when you go to localhost:/8000/about
app.get('/about',async(req, res) =>{
    res.render('about')
});

app.listen(8000, () =>{
    console.log("server is starting at port 8000")
});



app.post('/signup',async function(req,res){
    // let name = req.body.name;
    // let email = req.body.email;

    // console.log("this is the name: " + name);
    // console.log("this is the email: " + email);

    const user = new User({
        name: req.body.name,
        email: req.body.email
        
    });
    user.save();
    res.render('index');
   });

app.post('/login',async function(req,res){
      
    User.findOne({'name':req.body.name, 'email':req.body.email}, function(err,data){
        if (err) return err;

        if (data == null){
           return res.redirect('/')
        }
        return res.redirect('about')
        // console.log(err);
        // console.log(data);
        // console.log(User.find());
    });
   });

// //WORKING WITH EXAMPLES ON YOUTUBE
// const fs = require('fs');

// fs.readdir('./', function(err,files){
//     if (err){
//         console.log('Error',err);
//     } else{
//         console.log('Result', files)
//     }
// });

// //this is a class not an object it is being pulled from the nodeJS api
// const EventEmitter = require('events');
// //this creates an instance from the event emitter class 
// const emitter = new EventEmitter();

// //register a listender 
// emitter.on('messageLogged', function(){
//     console.log('listener called');
// });


// emitter.emit('message logged');