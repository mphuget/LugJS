const router = require('express').Router();
const controller = require("../controllers/recommandation");

//Create a Recommandation
router.post('/recommandation/create/:from/:to', (req, res) => {

    controller.create(req, res);

});

module.exports = router;
