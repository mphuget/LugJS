function createNote(req, res) {

    let Note = require('../models/note');

    let newNote = Note ({
        criterion: req.body.criterion,
        value : req.body.value,
        ownedBy : req.session.userid, 
        product : req.params.id
    });
  
    newNote.save()
    .then((savedNote) => {

        res.status(200).json(savedNote);
    }, (err) => {
                res.status(500).json(err);    
    });

}

function updateNote(req, res) {
    let Note = require("../models/note");

    Note.findByIdAndUpdate({_id: req.params.id}, 
        {criterion : req.body.criterion,
        value : req.body.value}, 
        {new : true})
    .then((updatedNote) => {
        res.status(200).json(updatedNote);
    }, (err) => {
        res.status(500).json(err);
    });
}

module.exports.create = createNote;
module.exports.update = updateNote;
