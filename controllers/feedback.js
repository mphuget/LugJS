function createFeedback(req, res) {
    let Feedback = require('../models/feedback');

    let newFeedback = Feedback ({
        content: req.body.content,
        ownedBy : req.session.userid, 
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

module.exports.create = createFeedback;
