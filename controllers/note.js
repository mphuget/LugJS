function createNote(req, res) {

    let Note = require('../models/note');

    let newNote = Note ({
        content: req.body.content,
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

module.exports.create = createNote;