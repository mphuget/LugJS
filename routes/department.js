const router = require('express').Router();
const controller = require("../controllers/department");

//Create a department
router.post('/department/create/:id', (req, res) => {

    controller.create(req, res);

});

//Update a department
router.put('/department/update/:id', (req, res) => {

    controller.update(req, res);

});


module.exports = router;