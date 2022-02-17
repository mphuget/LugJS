const router = require('express').Router();
const controller = require("../controllers/shop");

//Create a shop
router.post('/shop/create', (req, res) => {

    controller.create(req, res);

});

//Read shop created by a user
router.get('/shop/read/:id', (req, res) => {

    controller.read(req, res);

});

//Read all the shops created by a user
router.get('/shop/read/all', (req, res) => {

    controller.readAll(req, res);

});


module.exports = router;