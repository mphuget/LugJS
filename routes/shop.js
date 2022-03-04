const router = require('express').Router();
const controller = require("../controllers/shop");

//Create a shop
router.post('/shop/create', (req, res) => {

    controller.create(req, res);

});

//Read shop created by a user
router.get('/shop/read/:id', (req, res) => {

    controller.read(req, res);

});

//Read all the shops created by a user
router.get('/shop/readall', (req, res) => {

    controller.readAll(req, res);

});

//Update a Shop
router.put('/shop/update/:id', (req, res) => {

    controller.update(req, res);

});

//Close a Shop (the Shop is not deleted from the database)
router.delete('/shop/close/:id', (req, res) => {

    controller.close(req, res);

});

//Read all the Department from a Shop
router.get('/shop/departments/:id', (req, res) => {

    controller.departments(req, res);
    
});


module.exports = router;