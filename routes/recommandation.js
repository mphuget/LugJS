const router = require('express').Router();
const controller = require("../controllers/recommandation");

//Create a Recommandation
router.post('/recommandation/create/:from/:to', (req, res) => {

    controller.create(req, res);

});

//Delete a Recommandation
router.delete('/recommandation/delete/:id', (req, res) => {

    controller.delete(req, res);

});

module.exports = router;
