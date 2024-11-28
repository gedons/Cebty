const Question = require("../models/question.model");

module.exports = {
    create(req, res){
        const payload = req.body;
        if(payload == undefined){
            return res.send("The request body cannot be empty");
        }

        Question.create(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    getForTest(req, res){
        const {testId} = req.params;

        const payload = {
            testId
        }

        if(testId){
            return Question.allForTest(payload, (err, questions)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(questions);
                }
            })
        }else{
            return res.send({
                status: false,
                message: "Please provide the test id payload"
            })
        }
    },
    editQuestion(req, res){
        const payload = req.body;
        if(payload != undefined){
            return Question.editQuestion(payload, (err, questions)=>{
                if(err){
                    res.send(err);
                }else {
                    res.send(questions);
                }
            })
        }else{
            return res.send({
                status: false,
                message: "Please provide the test id payload"
            })
        }
    },
    deleteQuestion(req, res){
        const {id} = req.params;

        if(id != undefined){
            const payload = {
                id
            }
            
            return Question.deleteQuestion(payload, (err, result)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(result);
                }
            })
        }else {
            return res.send({
                status: false,
                message: "Please provide the test id payload"
            })
        }

    }
}