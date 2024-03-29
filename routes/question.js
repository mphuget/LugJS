const router = require('express').Router();
const controller = require("../controllers/question");

//Create a Question
router.post('/question/create/:id', (req, res) => {

    controller.create(req, res);

});

//Read a Question
router.get('/question/read/:id', (req, res) => {

    controller.read(req, res);

});



//Update a Question
router.put('/question/update/:id', (req, res) => {

    controller.update(req, res);

});


//Delete a Question
router.delete('/question/delete/:id', (req, res) => {

    controller.delete(req, res);

});

module.exports = router;