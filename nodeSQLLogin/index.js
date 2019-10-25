const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const SQL = require('./libs/sql')
const app = express();



app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//when browser sends get request
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/signup', (req, res) =>{
    let username = req.body.username;
    let email = req.body.email;
    let telephone = req.body.phoneNo;
    let password = req.body.password;
    let radioVal = req.body.radioSign

    sql.signup(username,email,telephone,password,radioVal);
    res.render('index')
})

app.post('/login', async (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;

    let result =  await sql.login(username,password)
    res.render(result)
})

/* Insert code here*/
let connectionOptions = [
    'localhost',
    'root',
    'password',
    'user_details'
]

let sql = new SQL(...connectionOptions)

app.listen(1338, () => {
    console.log("listening on port 1338")
})