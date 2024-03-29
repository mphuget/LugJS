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

//Read all products from a department
router.get('/department/products/:id', (req, res) => {

    controller.products(req, res);

});

//Delete a Department
router.delete('/department/delete/:id', (req, res) => {

    controller.delete(req, res);
    
});

module.exports = router;