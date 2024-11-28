const PersonaData = require("../models/personaData.model");

module.exports = {
    all(req, res){
        const {test_id} = req.params;
        const payload = {
            test_id
        }

        PersonaData.all(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    create(req, res){
        const payload = req.body;

        PersonaData.create(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    edit(req, res){
        const payload = req.body;

        PersonaData.edit(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    delete(req, res){
        const payload = { id: req.params.id };

        PersonaData.delete(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    }
}