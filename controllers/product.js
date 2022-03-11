require('../models/feedback');

function createProduct(req, res) {
    let Product = require('../models/product');

    let newProduct = Product ({
        name: req.body.name,
        description : req.body.description,
        price : req.body.price
    });
  
    newProduct.save()
    .then((savedProduct) => {

        //link the product to the department
        let Department = require('../models/department');

        Department.findById({_id: req.params.id})
        .then((department) => {
            department.products.push(savedProduct._id)
            department.save().then((updatedDepartment) => {
                res.status(200).json(savedProduct);
            }, (err) => {
                res.status(500).json(err);    
            })
            
        }, (err) => {
            res.status(500).json(err);
        });
            
    }, (err) => {
        res.status(400).json(err)
    });

}

function updateProduct(req, res) {
    let Product = require("../models/product");

    Product.findByIdAndUpdate({_id: req.params.id}, 
        {name : req.body.name, 
        description : req.body.description, 
        price : req.body.price},
        {new : true})
    .then((updatedProduct) => {
        res.status(200).json(updatedProduct);
    }, (err) => {
        res.status(500).json(err);
    });
}

function readProduct(req, res) {

    let Product = require("../models/product");

    Product
    .findById({ _id: req.params.id })
    .populate('comments')
    .then((product) => {
        res.status(200).json(product);

    }, (err) => {
        res.status(500).json(err);
    });
 }

function deleteProduct(req, res) {

    let Product = require('../models/product');

    Product.findByIdAndUpdate({_id: req.params.id}, 
        {retired : true},
        {new : true})
    .then((updatedProduct) => {
        res.status(200).json(updatedProduct);
    }, (err) => {
        res.status(500).json(err);
    });
}

function addPhoto(req, res) {

    let Product = require('../models/product');

    Product.findById({_id: req.params.id})
    .then((product) => {
        product.photos.push(req.body.name)
        product.save().then((updatedProduct) => {
            res.status(200).json(updatedProduct);
        }, (err) => {
            res.status(500).json(err);    
        })
        
    }, (err) => {
        res.status(500).json(err);
    });

}

module.exports.create = createProduct;
module.exports.update = updateProduct;
module.exports.read = readProduct;
module.exports.delete = deleteProduct;
module.exports.addPhoto = addPhoto;

