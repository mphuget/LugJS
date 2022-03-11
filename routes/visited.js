const router = require('express').Router();
const controller = require("../controllers/visited");

//Create a Visit
router.post('/visited/create/:id', (req, res) => {

    controller.create(req, res);

});

module.exports = router;
