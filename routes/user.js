const router                    = require('express').Router();
const { createUser,loginUser }  = require('../models/user');

router.get('/', (req,res) => {
  res.render('user/index');
});

router.get('/new',(req,res) => {
  res.render('user/new', {title: 'User Signup'});
});

router.post('/new', (req,res) => {
  console.log(req.body);
  res.redirect('/user/new');
});

module.exports = router;