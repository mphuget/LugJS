var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ShopSchema = new Schema({

  name : {
    type : String,
    index : true,
    unique : true
  },
  description : String,
  ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  close : {
      type : Boolean,
      default : false
  },
  departments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
  createdAt : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Shop', ShopSchema);

