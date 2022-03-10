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

module.exports.create = createAnswer;
