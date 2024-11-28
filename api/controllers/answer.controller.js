const Answers = require("../models/answer.model");

module.exports = {
    create(req, res){
        const payload = req.body;
        if(payload == undefined){
            return res.send("The request body cannot be empty");
        }

        Answers.create(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    getForQuestion(req, res){
        const {questionId} = req.params;

        const payload = {
            questionId
        }

        if(questionId){
            return Answers.allForQuestion(payload, (err, answers)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(answers);
                }
            })
        }else{
            return res.send({
                status: false,
                message: "Please provide the question id payload"
            })
        }
    },
    getForTest(req, res){
        const {test_id} = req.params;

        const payload = {
            test_id
        }

        if(test_id){
            return Answers.allForTest(payload, (err, answers)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(answers);
                }
            })
        }else{
            return res.send({
                status: false,
                message: "Please provide the test id payload"
            })
        }
    },
    editAnswer(req, res){
        const payload = req.body;
        if(payload != undefined){
            return Answers.editAnswer(payload, (err, answers)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(answers);
                }
            })
        }else{
            return res.send({
                status: false,
                message: "Please provide the test id payload"
            })
        }
    },
    deleteAnswer(req, res){
        const {id} = req.params;

        if(id != undefined){
            const payload = {
                id
            }
            
            return Answers.deleteAnswer(payload, (err, result)=>{
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

    },
    setRightAnswer(req, res){
        const {id} = req.params;

        if(id != undefined){
            const payload = {
                id
            }
            
            return Answers.setRightAnswer(payload, (err, result)=>{
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