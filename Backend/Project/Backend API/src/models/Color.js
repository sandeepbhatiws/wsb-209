const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, 'Name is required'],
    match: /^[a-z A-Z]{2,15}$/,
    validate: {
      validator: async function(v) {
        const check = await this.constructor.findOne({ name : v, deleted_at : null });
        return !check;
      },
      message: props => `The specified name is already in use.`
    }
  },
  code : {
    type : String,
    required : [true, 'Code is required'],
    match: /^[a-zA-Z0-9#]{2,15}$/,
  },
  slug : {
    type : String,
    required : true,
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

const colorModel = mongoose.model('colors', colorSchema);

module.exports = colorModel;