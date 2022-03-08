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

//Update a Feedback
router.put('/feedback/update/:id', (req, res) => {

    controller.update(req, res);

});

//Delete a Feedback
router.delete('/feedback/delete/:id', (req, res) => {

    controller.delete(req, res);

});

module.exports = router;