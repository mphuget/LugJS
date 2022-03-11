var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RecommandationSchema = new Schema({

  from: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  to: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  createdAt : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Recommandation', RecommandationSchema);

