const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, 'Name is required'],
    match: /^[a-z A-Z]{2,15}$/,
  },
  slug : {
    type : String,
    required : true,
  },
  image : {
    type : String,
    default : '',
  },
  // images : {
  //   type : Array,
  //   default : [],
  // },
  parent_category_id : {
    type : String,
    required : [true, 'parent Category is required'],
    ref : 'categories'
  },
  sub_category_id : {
    type : String,
    required : [true, 'Sub Category is required'],
    ref : 'sub_categories'
  },
  sub_sub_category_id : {
    type : String,
    required : [true, 'Sub Sub Category is required'],
    ref : 'sub_sub_categories'
  },
  color_ids : {
    type : Array,
    required : [true, 'Color is required'],
    ref : 'colors'
  },
  material_ids : {
    type : Array,
    required : [true, 'Material is required'],
    ref : 'materials'
  },
  actual_price : {
    type : Number,
    required : true,
  },
  sale_price : {
    type : Number,
    required : true,
  },
  is_featured : {
    type : Boolean, // 1 - Yes 0 - No
    default : true
  },
  // is_new_arrivals : {
  //   type : Boolean,
  //   default : true
  // },
  // is_on_sale : {
  //   type : Boolean,
  //   default : true
  // },
  // is_best_selling : {
  //   type : Boolean,
  //   default : true
  // },
  // is_upsell : {
  //   type : Boolean,
  //   default : true
  // },
  short_description : {
    type : String,
    required : true,
  },
  long_description : {
    type : String,
    required : true,
  },
  // product_code : {
  //   type : String,
  //   required : true,
  // },
  // dimension : {
  //   type : String,
  //   required : true,
  // },
  // estimate_delivery_days : {
  //   type : String,
  //   required : true,
  // },
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

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;