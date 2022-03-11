const router = require('express').Router();
const controller = require("../controllers/product");

//Create a Product
router.post('/product/create/:id', (req, res) => {

    controller.create(req, res);

});

//Update a Product
router.put('/product/update/:id', (req, res) => {

    controller.update(req, res);

});

//Read a Product
router.get('/product/read/:id', (req, res) => {

    controller.read(req, res);

});

//Delete a Product
router.delete('/product/delete/:id', (req, res) => {

    controller.delete(req, res);

});

//Add a photo
router.post('/product/photo/add/:id', (req, res) => {

    controller.addPhoto(req, res);

});

//Remove a photo
router.delete('/product/photo/remove/:id', (req, res) => {

    controller.removePhoto(req, res);
    
});

module.exports = router;