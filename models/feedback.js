var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let FeedbackSchema = new Schema({

  content : String, 
  ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

