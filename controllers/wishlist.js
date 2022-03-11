function addWishlist(req, res) {

    let Wishlist = require('../models/wishlist');

    let newWishlist = Wishlist ({
        ownedBy : req.session.userid, 
        product : req.params.id
    });
  
    newWishlist.save()
    .then((savedWishlist) => {

        res.status(200).json(savedWishlist);
    }, (err) => {
                res.status(500).json(err);    
    });

}

function removeWishlist(req, res) {

    let Wishlist = require('../models/wishlist');

    Wishlist.findOneAndRemove({$and: [{ownedBy : req.session.userid}, {product : req.params.id}]})
    .then((wishlist) => {
        res.status(200).json(wishlist);
    }, (err) => {
        res.status(500).json(err);
    });

}


module.exports.add = addWishlist;
module.exports.remove = removeWishlist;
