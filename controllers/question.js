require('../models/answer');

function createQuestion(req, res) {
    let Question = require('../models/question');

    let newQuestion = Question ({
        content: req.body.content,
        ownedBy : req.session.userid, 
        product : req.params.id
    });
  
    newQuestion.save()
    .then((savedQuestion) => {

        //link the feedback to the product
        let Product = require('../models/product');

        Product.findById({_id: req.params.id})
        .then((product) => {
            product.questions.push(savedQuestion._id)
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

function updateQuestion(req, res) {
    let Question = require("../models/question");

    Question.findByIdAndUpdate({_id: req.params.id}, 
        {content : req.body.content}, 
        {new : true})
    .then((updatedQuestion) => {
        res.status(200).json(updatedQuestion);
    }, (err) => {
        res.status(500).json(err);
    });
}

function readQuestion(req, res) {

    let Question = require('../models/question');

    Question.findById({_id : req.params.id})
    .populate('answers')
    .exec((err, data) => {
        res.status(200).json(data);
    }, (err) => {
        res.status(500).json(err);
    });
    
}

module.exports.create = createQuestion;
module.exports.update = updateQuestion;
module.exports.read = readQuestion;