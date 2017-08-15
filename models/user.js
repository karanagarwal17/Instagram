var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String, lowercase: true, require: true
  }
})
