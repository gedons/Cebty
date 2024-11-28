const User = require("../models/user.model");

module.exports = {
    exists: (req, res) =>{
        if(req.token == undefined){
            return res.sendStatus(401);
            return;
        }   

        const params = req.body;
        User.exists(params, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },

    create: (req, res) =>{
        if(req.token == undefined){
            return res.sendStatus(401);
            return;
        } 

        if(req.body == undefined){
            return res.status(400).send({
                status: "false",
                message: "The request body cannot be empty"
            });
            return;
        }

        const {phoneNumber, email, password, institutionId} = req.body;
        
        if((phoneNumber == null && phoneNumber == "") && (email == "" && email == null)){
            return res.send({
                status: "false",
                message: "Both the phone number and the email must be provided"
            });
        }

        const user = new User({
            phoneNumber,
            email,
            password,
            institutionId
        });
        
        User.create(user, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },

    all: (req, res) =>{
        if(req.token == undefined){
            return res.sendStatus(401);
            return;
        } 
        
    
        const payload = {
            institutionId: req.params.institutionId
        }

        User.all(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
            
        })
    },

    edit: (req, res) =>{
         if(req.token == undefined){
            return res.sendStatus(401);
            return;
        }

        const payload = req.body;

        User.edit(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },

    delete: (req, res) =>{
         if(req.token == undefined){
            return res.sendStatus(401);
            return;
        }

        const { userId } = req.params;

        const payload = {userId};

        User.delete(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    }
}