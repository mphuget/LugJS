const router = require('express').Router();
const controller = require("../controllers/answer");

//Create an Answer
router.post('/answer/create/:id', (req, res) => {

    controller.create(req, res);

});
/*
//Read a Feedback
router.get('/feedback/read/:id', (req, res) => {

    controller.read(req, res);

});

*/

//Update an Answer
router.put('/answer/update/:id', (req, res) => {

    controller.update(req, res);

});

/*
//Delete a Feedback
router.delete('/feedback/delete/:id', (req, res) => {

    controller.delete(req, res);

});
*/
module.exports = router;