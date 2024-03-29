var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let QuestionSchema = new Schema({

  content : String, 
  ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  retired : {
      type: Boolean,
      default: false
  },
  createdAt : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Question', QuestionSchema);

