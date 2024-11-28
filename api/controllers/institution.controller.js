const Institution = require("../models/institution.model");
const User = require("../models/user.model");

module.exports = {
    create(req, res) {
        const {name} = req.body;

        if(req.body == undefined){
            return res.send({
                status: false,
                message: "Request body cannot be empty"
            })
        }else if(name == undefined){
            return res.send({
                status: false,
                message: "Please provide the name of the institution"
            })
        }else {
            Institution.create({name}, (err, result)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(result);
                }
            })
        }
    },
    get(req, res) {
        const {id} = req.params;

        if(id == "all"){
            Institution.all((err, result)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(result);
                }
            })
        }else {
            Institution.get(id, (err, result)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(result);
                }
            })
        }

        
    },

    modify(req, res){
        if(req.body == undefined){
            return res.sendStatus(500).send("The request body cannot be empty");
        }

        // Get the id and the new name of the institution to be modified
        const {id, institution_name} = req.body;
        // Check that the id and the name exists
        if(id && institution_name){
            Institution.modify({id, institution_name}, (err, result)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(result);
                }
            })
        }else {
            return res.send({
                status: "false",
                message: "Please provide all parameters"
            })
        }
    },
    delete(req, res){
        if(req.body == undefined){
            return res.status(500).send("The request body cannot be empty");
        }

        const {id} = req.params;

        // Check that the id is not undefined
        if(id){
            Institution.delete(id, (err, result)=>{
                if(err){
                    return res.send(err);
                }else {
                    return res.send(result)
                }
            });
        }
    }
}