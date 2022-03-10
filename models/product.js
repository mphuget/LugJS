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
  },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feedback'}],
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
});

module.exports = mongoose.model('Product', ProductSchema);

