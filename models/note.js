var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let NoteSchema = new Schema({

    value : Number, 
    criterion: String,
    ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);

