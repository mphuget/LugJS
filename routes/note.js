const router = require('express').Router();
const controller = require("../controllers/note");

//Create a Question
router.post('/note/create/:id', (req, res) => {

    controller.create(req, res);

});

module.exports = router;