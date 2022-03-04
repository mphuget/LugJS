var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProductSchema = new Schema({

  name : {
    type : String,
    index : true,
    unique : true
  },
  description : String,
  price : Number,
  stock : Number, 
  createdAt : {
    type : Date,
    default : Date.now
  }, 
  retired : {
      type : Boolean, 
      default : false
  }
});

module.exports = mongoose.model('Product', ProductSchema);

