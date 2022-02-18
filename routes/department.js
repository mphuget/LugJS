const router = require('express').Router();
const controller = require("../controllers/department");

//Create a department
router.post('/department/create/:id', (req, res) => {

    controller.create(req, res);

});

module.exports = router;