const router = require('express').Router();
const controller = require("../controllers/feedback");

//Create a Feedback
router.post('/feedback/create/:id', (req, res) => {

    controller.create(req, res);

});

//Read a Feedback
router.get('/feedback/read/:id', (req, res) => {

    controller.read(req, res);

});

module.exports = router;