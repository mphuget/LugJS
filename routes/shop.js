const router = require('express').Router();
const controller = require("../controllers/shop");

//Create a shop
router.post('/shop', (req, res) => {

    controller.create(req, res);

});

module.exports = router;