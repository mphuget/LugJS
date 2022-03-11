var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let VisitedSchema = new Schema({

  ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  createdAt : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Visited', VisitedSchema);

