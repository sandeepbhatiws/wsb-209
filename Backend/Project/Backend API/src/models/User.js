const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, 'Name is required'],
    match: /^[a-z A-Z]{2,15}$/,
  },
  email : {
    type : String,
    required : [true, 'Email is required'],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  mobile_number : {
    type : Number,
    default : '',
    match: /^[0-9]{8,15}$/,
  },
  password : {
    type : String,
    required : true,
  },
  address : {
    type : String,
    default : '',
  },
  gender : {
    type : String,
    default : '',
    enum : ['','Male', 'Female']
  },
  status : {
    type : Boolean,
    default : true
  },
  order : {
    type : Number,
    default : 0
  },
  created_at : {
    type : Date,
    default : new Date()
  },
  updated_at : {
    type : Date,
    default : new Date()
  },
  deleted_at : {
    type : Date,
    default : ''
  },
});

userSchema.path('email').validate(async function(value) {
  const query = {
    email: value,
    deleted_at: null
  };

  const currentId = (this.getQuery && this.getQuery()._id) || this._id;

  if (currentId) {
    query._id = { $ne: currentId };
  }

  const existing = await userModel.findOne(query);
  return !existing;
}, 'The specified email is already in use.');

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;