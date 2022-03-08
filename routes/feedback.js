const router = require('express').Router();
const controller = require("../controllers/feedback");

//Create a Product
router.post('/feedback/create/:id', (req, res) => {

    controller.create(req, res);

});

module.exports = router;