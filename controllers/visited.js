function createVisited(req, res) {

    let Visited = require('../models/visited');

    let newVisited = Visited ({
        ownedBy : req.session.userid, 
        product : req.params.id
    });
  
    newVisited.save()
    .then((savedVisited) => {

        res.status(200).json(savedVisited);
    }, (err) => {
                res.status(500).json(err);    
    });
    
}

function readAll(req, res) {

    let Visited = require("../models/visited");

    Visited.find({ownedBy : req.session.userid})
    .then((visits) => {
        res.status(200).json(visits);
    }, (err) => {
        res.status(500).json(err);
    });
}

module.exports.create = createVisited;
module.exports.read = readAll;
