let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DepartmentSchema = new Schema({

  name : {
    type : String,
    index : true,
    unique : true
  },
  description : String,
  createdAt : {
    type : Date,
    default : Date.now
  },
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  retired : {
    type : Boolean,
    default : false
  }
});

module.exports = mongoose.model('Department', DepartmentSchema);

