const Certificate = require("../models/certificate.model");

module.exports = {
    create(req, res){
        const payload = res.body;

        Certificate.create(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    edit(req, res){
        const payload = req.body;

        Certificate.edit(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    all(req, res){
        const payload = req.params;

        Certificate.all(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    delete(req, res){
        const payload = req.params;

        Certificate.delete(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    }
}