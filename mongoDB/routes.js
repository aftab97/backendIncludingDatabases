const Router = require('router');
const router = Router();
const User = require('./models/user.js');
​
router.get('/', (req, res) => {
 res.render('login');
});
​
router.post('/', (req, res) => {
 let name = req.body.name;
 let user = new User({name: name});
 user.save();
});