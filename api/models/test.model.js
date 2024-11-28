const db = require('../config/db.config');
const xlsx = require('xlsx');

module.exports = {
    create(payload, callback){
        
        const {
            name,
            institutionId,
            duration,
            type,
            timeProtocol,
            startTime,
            endTime,
            usePreRegisteredCandidates,
            randomizeQuestions,
            totalMark
        } = payload;

        const sql = `INSERT INTO test (test_name, institution_id, duration, type, time_protocol, start_time, end_time, use_preregistered_candidates, randomize_questions, total_mark) VALUES(?,?,?,?,?,?,?,?,?,?)`;
        db.query(sql, [
            name, 
            institutionId,
            duration,
            type,
            timeProtocol,
            startTime,
            endTime,
            usePreRegisteredCandidates,
            randomizeQuestions,
            totalMark], (err, result)=>{
                if(err){
                    return callback(err, null);
                }else {
                    const {insertId} = result;
                    const recallSql = `SELECT * FROM test WHERE id = ?`;

                    db.query(recallSql, [insertId], (err, test)=>{
                        if(err){
                            return callback(err, null)
                        }else {
                            return callback(null, {
                                status: true,
                                message: "Test created succesfully",
                                body: test
                            })
                        }
                    })
                    
                }
            })
    },
    all(institutionId, callback){
        const sql = `SELECT * FROM test WHERE deleted = 0 AND institution_id = ?`;

        db.query(sql, [institutionId], (err, tests)=>{
            if(err){
                return callback(err, null);
            }else{
               return callback(null, {
                    status: true,
                    message: 'Here are the tests found',
                    body: tests
                })
                
            }
        })
    },
    get(id, callback){
        const sql = `SELECT * FROM test WHERE deleted = 0 AND id = ?`;
        db.query(sql, [id], (err, test)=>{
            if(err){
                return callback(err, null);
            }else {
                if(test[0] == undefined){
                    return callback({
                        status: false,
                        message: 'No matching test with that id found'
                    })
                }else {
                    return callback(null, {
                        status: true,
                        message: 'Test found',
                        body: test[0]
                    })
                }
            }
        });
    },
    edit(payload, callback){
   
        const sql = `UPDATE test SET test_name = ?, type = ?, institution_id = ?, duration = ?, time_protocol = ?, start_time = ?, end_time = ?, use_preregistered_candidates = ?, randomize_questions = ? WHERE id = ${payload.id} AND deleted = 0`

        console.log(payload);
        const values = {
            test_name: payload.test_name,
            type: payload.type,
            institution_id: payload.institution_id,
            duration: payload.duration,
            time_protocol: payload.time_protocol,
            start_time: payload.start_time,
            end_time: payload.end_time,
            use_preregistered_candidates: payload.use_preregistered_candidates, 
            randomize_questions: payload.randomize_questions
        }

        db.query(sql, Object.values(values), (err, test)=>{
            if(err){
                return callback(err, null);
            }else {
                return callback(null, {
                    status: true,
                    message: 'Test found',
                    body: test
                })
            }
        });
    },
    delete({id}, callback){
        // The payload is the id of the test to be deleted
        const sql = `UPDATE test SET deleted = 1 WHERE id = ?`;

        db.query(sql, [id], (err, result)=>{
            if(err){
                callback(err, null);
            }else {
                callback(err, {
                    status: true,
                    message: 'Test deleted successfully',
                    body: result
                });
            }
        })
    },
    start({id}, callback){
        const sql = `UPDATE test SET status = 'active' WHERE id = ?`;

        db.query(sql, [id], (err, result)=>{
            if(err){
                callback(err, null);
            }else {
                callback(err, {
                    status: true,
                    message: 'Test has started',
                    body: result
                });
            }
        })
    },
    stop({id}, callback){
        const sql = `UPDATE test SET status = 'inactive' WHERE id = ?`;

        db.query(sql, [id], (err, result)=>{
            if(err){
                callback(err, null);
            }else {
                callback(err, {
                    status: true,
                    message: 'Test has stopped',
                    body: result
                });
            }
        })
    },
    validate(payload, callback){
        const sql = `SELECT a.id, a.test_name, a.institution_id, a.duration, a.type, a.time_protocol, a.start_time, a.end_time, a.status, a.use_preregistered_candidates, a.randomize_questions, a.total_mark, b.institution_name FROM test AS a LEFT JOIN institution AS b ON a.institution_id = b.id WHERE a.test_name = ? AND a.id = ? AND a.institution_id = ? AND a.status = "active" AND a.deleted = 0 AND b.deleted = 0`;

        db.query(sql, [payload.testName, payload.testId, payload.institutionId], (err, result)=>{
            if(err){
                callback(err, null);
            }else {
                if(result[0]){
                    callback(null, {
                        status: true,
                        message: 'Test validated',
                        body: result
                    });
                }else {
                    callback({
                        status: false,
                        message: 'Unable to validate test code'
                    })
                }
            }
        })
    },
    processExcelFile(payload, callback){
        
    }
}