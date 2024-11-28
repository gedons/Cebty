const db = require("../config/db.config");

module.exports = {
    create({data, testId, type}, callback){
        const sql = `INSERT INTO question (data, test_id, type) VALUES (?, ?, ?)`;

        db.query(sql, [data, testId, type], (err, result)=>{
            if(err){
                callback({
                    status: false,
                    message: "An error just occured",
                    error: err
                }, null)
            }else {
                const {insertId} = result;
                const retrieveSql = `SELECT * FROM question WHERE id = ?`;
                db.query(retrieveSql, [insertId], (err, result)=>{
                    if(err){
                        callback(err);
                    }else {
                         callback(null, {
                            status: true,
                            message: "The question has been successfully created in the database",
                            body: result
                        })  
                    }
                })
                
            }
        })
    },
    allForTest({testId}, callback){

        if(testId){
            // If the test id is provided
            const sql = `SELECT * FROM question WHERE test_id = ? AND deleted = 0`;

            db.query(sql, [testId], (err, questions)=>{
                if(err){
                    callback({
                        status: false,
                        message: "An error just occured",
                        error: err
                    })
                }else {
                    callback(null, {
                        status: true,
                        message: "Here are the list of questions found",
                        questions
                    })
                }
            });
        }else {
            // If the test id is not provided
            const sql = `SELECT * FROM question WHERE deleted = 0`;

            db.query(sql, (err, questions)=>{
                if(err){
                    callback({
                        status: false,
                        message: "An error just occured",
                        error: err
                    })
                }else {
                    callback(null, {
                        status: true,
                        message: "Here are the list of questions found",
                        questions
                    })
                }
            });
        }
        
    },
    editQuestion({data, id, type}, callback){
        const sql = `UPDATE question SET data = ?, type = ? WHERE id = ? AND deleted = 0`;

        db.query(sql, [data, type, id], (err, result)=>{
            if(err){
                callback({
                    status: false,
                    message: "An error just occured",
                    error: err
                }, null)
            }else {
                callback(null, {
                    status: true,
                    message: "The question has been successfully updated in the database",
                    body: result
                })
            }
        })
    },
    deleteQuestion({id}, callback){
        const sql = `UPDATE question SET deleted = 1 WHERE id = ?`;

        db.query(sql, [id], (err,result)=>{
            if(err){
                callback({
                    status: false,
                    message: "Could not delete the question",
                    error: err
                }, null)
            }else {
                callback(null, {
                    status: true,
                    message: "The question has been successfully deleted",
                    body: result
                })
            }
        })
    }
}