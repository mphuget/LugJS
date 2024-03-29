var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AnswerSchema = new Schema({

  content : String, 
  ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt : {
    type : Date,
    default : Date.now
  },
  retired: {
      type: Boolean,
      default: false
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);

