const router = require('express').Router();
const controller = require("../controllers/wishlist");

//Add a Product to the Wishlist
router.post('/wishlist/add/:id', (req, res) => {

    controller.add(req, res);

});

module.exports = router;
