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

module.exports.add = addWishlist;