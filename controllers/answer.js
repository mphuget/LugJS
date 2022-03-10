function createAnswer(req, res) {
    let Answer = require('../models/answer');

    let newAnswer = Answer ({
        content: req.body.content,
    });
  
    newAnswer.save()
    .then((savedAnswer) => {

        //link the answer to the question
        let Question  = require('../models/question');

        Question.findById({_id: req.params.id})
        .then((question) => {
            question.answers.push(savedAnswer._id)
            question.save().then((updatedQuestion) => {
                res.status(200).json(updatedQuestion);
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

function updateAnswer(req, res) {
    let Answer = require("../models/answer");

    Answer.findByIdAndUpdate({_id: req.params.id}, 
        {content : req.body.content}, 
        {new : true})
    .then((updatedAnswer) => {
        res.status(200).json(updatedAnswer);
    }, (err) => {
        res.status(500).json(err);
    });
}

function deleteAnswer(req, res) {

    let Question = require('../models/question');

    Question.findByIdAndUpdate(req.params.question, 
        { $pullAll: { answers: [req.params.id] } }, 
        { new: true }, 
        function(err, data) {
            res.status(200).json(data);
        } 
    );
}

module.exports.create = createAnswer;
module.exports.update = updateAnswer;
module.exports.delete = deleteAnswer;
