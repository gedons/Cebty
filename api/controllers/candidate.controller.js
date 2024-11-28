const Candidate = require("../models/candidate.model");

module.exports = {
    create(req, res){
       	const payload = req.body;
        Candidate.create(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        })
    },
    score(req, res){
    	const payload = req.body;
    	Candidate.score(payload, (err, result)=>{
    		if(err){
    			return res.send(err);
    		}else {
    			return res.send(result);
    		}
    	})
    },
    total(req, res){
        const payload = req.params;

    	Candidate.total(payload, (err, result)=>{
    		if(err){
    			return res.send(err);
    		}else {
    			return res.send(result);
    		}
    	})
    },
    details(req, res){
        const payload = req.params;

        Candidate.details(payload, (err, result)=>{
            if(err){
                return res.send(err);
            }else {
                return res.send(result);
            }
        });
    }
}