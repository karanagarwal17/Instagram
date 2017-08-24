var express = require('express');
var bcrypt = require('bcryptjs');
var randomstr = require('randomstring');
var _ = require('lodash');
var validator = require('validator');
var nodemailer = require('nodemailer');

var users = require('../models/user');
var config = require('../config/main');
var router = express.Router();

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.email.address,
		pass: config.email.password
	}
})

var isValidator = (data) => {
	var errors = {};
	if (!validator.isEmail(data.email)) {
		errors.email = "This field requires email"
	}
	if (validator.isEmpty(data.email)) {
		errors.email = "This field is required"
	}
	if (validator.isEmpty(data.password)) {
		errors.password = "This field is required"
	}
	if (validator.isEmpty(data.username)) {
		errors.username = "This field is required"
	}
	if (validator.isEmpty(data.fullname)) {
		errors.fullname = "This field is required"
	}
	if (!validator.isLength(data.password, {min: 7})) {
		errors.password = "This field required 7 or more characters"
	}
	return {errors, isValid: _.isEmpty(errors)}
}

router.post('/26103fb4c8a39282f473a566194004c9145452a7/signup', (req, res, next) => {
	var token = randomstr.generate(64);
	const {errors, isValid} = isValidator(req.body);
	var host = req.get('host');
	var link = 'http://' + req.get('host') + '/verify/' + token;
	if (isValid) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				var user = new users({'username': req.body.username, 'email': req.body.email, 'fullname': req.body.fullname, 'password': hash, 'activation_token': token})
				user.save((err, user) => {
					if (err) {
						console.log(err);
					}
					var emailOptions = {
						from: '"Instagram" <feedbacklnmiit@gmail.com>',
						to: user.email,
						subject: 'Activate your Instagram Account',
						html: "Hello, <br/> Please click on the link to verify your email. <br/> <a href" + link + ">Click Here</a>"
					}
					transporter.sendMail(emailOptions, (err) => {
						if(err) {
							console.log(err);
						}
					})
					res.json({status: true, user});
				});
			});
		});
	} else {
		res.json({errors})
	}
});

module.exports = router;
