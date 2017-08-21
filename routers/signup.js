var express = require('express');
var bcrypt = require('bcryptjs');
var randomstr = require('randomstring');

var users = require('../models/user');

var router = express.Router();

router.post('/26103fb4c8a39282f473a566194004c9145452a7/signup',(req, res, next) => {
  var token = randomstr.generate(64);
  bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(req.body.password, salt, (err,hash) => {
      var user = new users({
        'username': req.body.username,
        'email': req.body.email,
        'fullname': req.body.fullname,
        'password': hash,
        'activation_token': token
      })
      user.save((err, user) => {
        if(err) {
          console.log(err);
        }
        res.json({status: true, user});
      });
    });
  });
});

module.exports = router;
