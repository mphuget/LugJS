const router = require('express').Router();
const controller = require("../controllers/note");

//Create a Note
router.post('/note/create/:id', (req, res) => {

    controller.create(req, res);

});

//Read all the Note for a Product
router.get('/note/read/:id', (req, res) => {

    controller.read(req, res);

});

//Update a Note
router.put('/note/update/:id', (req, res) => {

    controller.update(req, res);

});

//Delete a Note
router.delete('/note/delete/:id', (req, res) => {

    controller.delete(req, res);

});

module.exports = router;