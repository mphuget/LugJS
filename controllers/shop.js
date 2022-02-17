function createShop(req, res) {
    let Shop = require('../models/shop');

    console.log(req.session.userid);
    console.log(req.session.username);

    let newShop = Shop ({
        name: req.body.name,
        description : req.body.description,
        ownedBy : req.session.userid
    });
  
    newShop.save()
    .then((savedShop) => {

        //send back the created Todo
        res.json(savedShop);
            
    }, (err) => {
        res.status(400).json(err)
    });

}

module.exports.create = createShop;
