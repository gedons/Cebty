const db = require("../config/db.config");

module.exports = {
    get({testId}, callback){
        const sql = `SELECT record.id AS id, test.test_name AS test_name, record.candidate_id AS candidate_id, candidate_persona.persona_data AS persona_data, candidate_details.persona_value, record.score AS score FROM record LEFT JOIN candidate on record.candidate_id = candidate.id LEFT JOIN candidate_details on candidate.id = candidate_details.candidate_id LEFT JOIN test ON record.test_id = test.id LEFT JOIN candidate_persona ON candidate_persona.id = candidate_details.candidate_persona_id && candidate_persona.test_id = test.id  WHERE test.id = ? AND record.deleted = 0 ORDER BY record.id, candidate_persona.persona_data`;
        db.query(sql, [testId], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'An error just occured',
                    err
                })
            }else {
                return callback(null, {
                    status: true,
                    message: 'Successfully retrieved results',
                    body: result
                })
            }
        })
    }
}