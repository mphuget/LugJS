function createFeedback(req, res) {
    let Feedback = require('../models/feedback');

    let newFeedback = Feedback ({
        content: req.body.content,
        ownedBy : req.session.userid, 
        product : req.params.id
    });
  
    newFeedback.save()
    .then((savedFeedback) => {

        //link the feedback to the product
        let Product = require('../models/product');

        Product.findById({_id: req.params.id})
        .then((product) => {
            product.comments.push(savedFeedback._id)
            product.save().then((updatedProduct) => {
                res.status(200).json(updatedProduct);
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

function readFeedback(req, res) {

    let Feedback = require('../models/feedback');

    Feedback.findById({_id : req.params.id})
    .then((feedback) => {
        res.status(200).json(feedback);
    }, (err) => {
        res.status(500).json(err);
    });

}

function updateFeedback(req, res) {
    let Feedback = require("../models/feedback");

    Feedback.findByIdAndUpdate({_id: req.params.id}, 
        {content : req.body.content}, 
        {new : true})
    .then((updatedFeedback) => {
        res.status(200).json(updatedFeedback);
    }, (err) => {
        res.status(500).json(err);
    });
}

function deleteFeedback(req, res) {

    let Feedback = require('../models/feedback');

    Feedback.findByIdAndRemove({_id: req.params.id})
    .then((deletedFeedback) => {

        let Product = require('../models/product');

        Product.findByIdAndUpdate(deletedFeedback.product, 
            { $pullAll: { comments: [deletedFeedback._id] } }, 
            { new: true }, 
            function(err, data) {
                res.status(200).json(data);
            } 
        );
        
    }, (err) => {
        res.status(500).json(err);
    });
}

module.exports.create = createFeedback;
module.exports.read = readFeedback;
module.exports.update = updateFeedback;
module.exports.delete = deleteFeedback;
