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

function readShop(req, res) {

    let Shop = require("../models/shop");

    Shop.find({$and: [{ownedBy : req.session.userid}, {_id : req.params.id}]})
    .then((shop) => {
        res.status(200).json(shop);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function readShopAll(req, res) {

    let Shop = require("../models/shop");

    Shop.find({ownedBy : req.session.userid})
    .then((shops) => {
        res.status(200).json(shops);
    }, (err) => {
        res.status(500).json(err);
    });
 }

module.exports.create = createShop;
module.exports.read = readShop;
module.exports.readAll = readShopAll;

