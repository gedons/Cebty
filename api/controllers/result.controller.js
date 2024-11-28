const Result = require("../models/result.model");

module.exports = {
	get(req, res){

		const payload = {
			testId: req.params.testId
		}

		Result.get(payload, (err, result)=>{
			if(err){
				return res.send(err);
			}else {
				return res.send(result);
			}
		})
	}
}