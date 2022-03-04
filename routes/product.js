const router = require('express').Router();
const controller = require("../controllers/product");

//Create a Product
router.post('/product/create/:id', (req, res) => {

    controller.create(req, res);

});

module.exports = router;