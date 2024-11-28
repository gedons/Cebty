const Test = require("../models/test.model");

module.exports = {
    create(req, res){
        if(req.body == undefined){
            return res.status(500).send("The request body cannot be empty");
        }

        const payload = req.body;

        Test.create(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    getByInstitution(req, res){
        const {institution_id} = req.params;

        if(institution_id == undefined){
            return res.status(500).send("The id is not provided for query");
        }

        
        Test.all(institution_id, (err,tests)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(tests);
            }
        })
    
    },
    get(req, res){
        const {id} = req.params;

        if(id == undefined){
            return res.status(500).send("The id is not provided for query");
        }

        
        Test.get(id, (err,test)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(test);
            }
        })
    },
    edit(req, res){
        const payload = req.body;

        if(payload == undefined){
            res.status(500).send("The request body is not provided for query");
        }

        Test.edit(payload, (err,test)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(test);
            }
        })
    },
    delete(req, res){
        const payload = {
            id : req.params.id
        }

        if(payload == undefined){
            return res.status(500).send("The request body is not provided for query");
        }

        Test.delete(payload, (err,test)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(test);
            }
        })
    },
    start(req, res){
        const payload = req.body;

        if(payload == undefined){
            return res.status(500).send("The request body is not provided for query");
        }

        Test.start(payload, (err,test)=>{
            if(err){
                res.send(err);
            }else {
                res.send(test);
            }
        })
    },
    stop(req, res){
        const payload = req.body;

        if(payload == undefined){
            return res.status(500).send("The request body is not provided for query");
        }

        Test.stop(payload, (err,test)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(test);
            }
        })
    },
    validate(req, res){
        const { testName, testId, institutionId } = req.query;
        const payload = {
            testName,
            testId,
            institutionId
        }

        Test.validate(payload, (err,test)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(test);
            }
        })
    },
    excel(req, res){
        try {
            const testId = req.params.testId;
            const file = req.body;
            console.log(file);
            const payload = {
                testId,
                file
            }
            
            Test.processExcelFile(payload, (err, result)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(result)
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: false,
                message: 'Error processing file'
            });
        }
    }
        
}