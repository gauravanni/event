const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

  facebook:{
    facebookId: String,
    name:String,
    picture:String,
    language:String,
    location:String,
    createdAt:String,
  },
  google:{
    googleId: String,
    name:String,
    picture:String,
    language:String,
    location:String,
    createdAt:String,
  },
  mobile:{
    Id: String,
    name:String,
    picture:String,
    language:String,
    location:String,
    createdAt:String,
  }
});

module.exports =mongoose.model('User', userSchema);