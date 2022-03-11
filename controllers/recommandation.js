function createRecommandation(req, res) {

    let Recommandation = require('../models/recommandation');

    let newRecommandation = Recommandation ({
        from: req.params.from,
        to: req.params.to
    });
  
    newRecommandation.save()
    .then((savedRecommandation) => {

        res.status(200).json(savedRecommandation);
    }, (err) => {
                res.status(500).json(err);    
    });

}

module.exports.create = createRecommandation;
