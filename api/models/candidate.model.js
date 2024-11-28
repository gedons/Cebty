const db = require("../config/db.config");

module.exports = {
    create(payload, callback){
        const { testId, candidatePersona, details } = payload;
      
        const sql = `INSERT INTO candidate SET test_id = ?`;



        db.query(sql, [testId], (err, res)=>{
            if(err){
                return callback(err, null);
            }else {
                // Include persona details
                

                (async ()=>{
                    const {insertId} = res;
                    let detailsInsertSql = "";
                    candidatePersona.forEach((data)=>{
                        const {id, persona_data} = data;
                        const detail = details[persona_data];
                        detailsInsertSql = `INSERT INTO candidate_details SET candidate_id = "${insertId}", candidate_persona_id = "${id}", persona_value = "${detail}"`;
                        

                        db.query(detailsInsertSql, (err, result)=>{
                            if(err){
                               console.log(err);
                            }else {
                                console.log(result); // To be commented later
                            }
                        });
                    })
                })();

                return callback(null, {
                    status: true,
                    message: "Successfully created candidate",
                    data: res
                }) 
                
            }
        })
    },
    score(payload, callback){
        const {candidateId,  testId, score} = payload;

        const sql = `INSERT INTO record(test_id, candidate_id, score) VALUES (?,?,?)`;

        db.query(sql, [testId, candidateId, score], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'Unable to insert score',
                    err
                })
            }else {
                return callback(null, {
                    status: true,
                    message: 'Successfully entered score for candidate',
                    body: result
                })
            }
        });
    },
    total(payload, callback){
        const sql = `SELECT COUNT(*) AS total FROM candidate LEFT JOIN test ON candidate.test_id = test.id WHERE test.institution_id = ? AND candidate.deleted = 0 AND test.deleted = 0`;
        db.query(sql, [payload.institutionId], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'Unable to fetch result for number of candidates',
                    err
                })
            }else {
                return callback(null, {
                    status: true,
                    message: 'Count successful',
                    body: result
                })
            }
        })
    },
    details(payload, callback){
        const sql = `SELECT * FROM candidate_details WHERE candidate_id = ? AND deleted = 0 ORDER BY candidate_persona_id`;

        db.query(sql, [payload.candidateId], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'An error occured',
                    err
                })
            }else {
                return callback(null, {
                    status: true,
                    message: 'Found details',
                    body: result
                })
            }
        })
    }
}