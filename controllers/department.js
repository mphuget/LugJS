function createDepartment(req, res) {
    let Department = require('../models/department');

    let newDepartment = Department ({
        name: req.body.name,
        description : req.body.description
    });
  
    newDepartment.save()
    .then((savedDepartment) => {

        //link the derpartment to the shop
        let Shop = require('../models/shop');

        Shop.findById({_id: req.params.id})
        .then((shop) => {
            shop.departments.push(savedDepartment._id)
            shop.save().then((updatedShop) => {
                res.status(200).json(updatedShop);
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

function updateDepartment(req, res) {
    let Department = require("../models/department");

    Department.findByIdAndUpdate({_id: req.params.id}, 
        {name : req.body.name, 
        description : req.body.description}, 
        {new : true})
    .then((updatedDepartment) => {
        res.status(200).json(updatedDepartment);
    }, (err) => {
        res.status(500).json(err);
    });
}



module.exports.create = createDepartment;
module.exports.update = updateDepartment;