const router = require('express').Router();
const controller = require("../controllers/answer");

//Create an Answer
router.post('/answer/create/:id', (req, res) => {

    controller.create(req, res);

});

//Update an Answer
router.put('/answer/update/:id', (req, res) => {

    controller.update(req, res);

});


//Delete an Answer
router.delete('/answer/delete/:question/:id', (req, res) => {

    controller.delete(req, res);

});

module.exports = router;