const db = require("../config/db.config");

module.exports = {
    create({data, questionId}, callback){
        const sql = `INSERT INTO answer (data, question_id) VALUES (?, ?)`;

        db.query(sql, [data, questionId], (err, result)=>{
            if(err){
                callback({
                    status: false,
                    message: "An error just occured",
                    error: err
                }, null)
            }else {

                const { insertId } = result;
                const retrieveSql = `SELECT * FROM answer WHERE id = ?`;
                db.query(retrieveSql, [insertId], (err, result)=>{
                   if(err){
                        callback({
                            status: false,
                            message: "An error just arrived",
                            err: err
                        })
                   }else {
                        callback(null, {
                            status: true,
                            message: "The answer has been successfully created in the database",
                            body: result
                        })
                   }
                })
                
            }
        })
    },
    allForQuestion({questionId}, callback){

        if(questionId){
            // If the test id is provided
            const sql = `SELECT * FROM answer WHERE question_id = ? AND deleted = 0`;

            db.query(sql, [questionId], (err, answers)=>{
                if(err){
                    callback({
                        status: false,
                        message: "An error just occured",
                        error: err
                    })
                }else {
                    callback(null, {
                        status: true,
                        message: "Here are the list of answers found",
                        answers
                    })
                }
            });
        }else {
            // If the test id is not provided
            const sql = `SELECT * FROM answer WHERE deleted = 0`;

            db.query(sql, (err, answers)=>{
                if(err){
                    callback({
                        status: false,
                        message: "An error just occured",
                        error: err
                    })
                }else {
                    callback(null, {
                        status: true,
                        message: "Here are the list of answers found",
                        answers
                    })
                }
            });
        }
        
    },
    allForTest({test_id}, callback){

        if(test_id){
            // If the test id is provided
            const sql = `SELECT a.id , a.data, a.question_id, a.is_right_answer FROM answer AS a LEFT JOIN question AS b ON a.question_id = b.id LEFT JOIN test AS c ON b.test_id = c.id WHERE c.id = ? AND a.deleted = 0`;

            db.query(sql, [test_id], (err, answers)=>{
                if(err){
                    callback({
                        status: false,
                        message: "An error just occured",
                        error: err
                    })
                }else {
                    callback(null, {
                        status: true,
                        message: "Here are the list of answers found",
                        answers
                    })
                }
            });
        }else {
            // If the test id is not provided
            const sql = `SELECT * FROM answer WHERE deleted = 0`;

            db.query(sql, (err, answers)=>{
                if(err){
                    callback({
                        status: false,
                        message: "An error just occured",
                        error: err
                    })
                }else {
                    callback(null, {
                        status: true,
                        message: "Here are the list of answers found",
                        answers
                    })
                }
            });
        }
        
    },
    editAnswer({data, id}, callback){
        const sql = `UPDATE answer SET data = ? WHERE id = ? AND deleted = 0`;

        db.query(sql, [data, id], (err, result)=>{
            if(err){
                callback({
                    status: false,
                    message: "An error just occured",
                    error: err
                }, null)
            }else {
                callback(null, {
                    status: true,
                    message: "The answer has been successfully updated in the database",
                    body: result
                })
            }
        })
    },
    deleteAnswer({id}, callback){
        const sql = `UPDATE answer SET deleted = 1 WHERE id = ?`;

        db.query(sql, [id], (err,result)=>{
            if(err){
                callback({
                    status: false,
                    message: "Could not delete the answer",
                    error: err
                }, null)
            }else {
                callback(null, {
                    status: true,
                    message: "The answer has been successfully deleted",
                    body: result
                })
            }
        })
    },
    setRightAnswer({id}, callback){

        // First check that type of question that has the question
        const retrieveAnswerSQL = `SELECT * FROM  answer WHERE id =? AND deleted = 0`;

        db.query(retrieveAnswerSQL, [id], (err, retieveAnswerResult)=>{

            if(err){
                callback({
                    status: false,
                    message: "Could not set the answer as right answer because the question is not defined",
                    error: err
                }, null)
            }

            if(retieveAnswerResult[0] == undefined){
                callback({
                    status: false,
                    message: "Could not find the answer",
                    error: err
                }, null)
            }else {
                const retieveQuestionSQL = `SELECT * FROM question WHERE question.id = ${retieveAnswerResult[0].question_id}`;

                db.query(retieveQuestionSQL, (err, retieveQuestionResult)=>{
                    if(err){
                        callback({
                            status: false,
                            message: "Could not set the answer as right answer because the question is not defined",
                            error: err
                        }, null)
                    }else {
                        const questionType = retieveQuestionResult[0].type;
                        switch(questionType){
                            case "single_choice": {
                                const resetSQL = `UPDATE answer SET is_right_answer = 0 WHERE question_id = ?;`;
    
                                db.query(resetSQL, [retieveQuestionResult[0].id], (err, result)=>{

                                    if(err){
                                        callback({
                                            status: false,
                                            message: "Could not set the answer as right answer an error occurred",
                                            error: err,
                                            id
                                        }, null)
                                    }

                                    const sql = `UPDATE answer SET is_right_answer = 1 WHERE id = ?;`

                                    db.query(sql, [id], (err, result)=>{
                                        if(err){
                                            callback({
                                                status: false,
                                                message: "Could not set the answer as right answer because the question is not defined",
                                                error: err,
                                                id
                                            }, null)
                                        }else {
                                            callback(null, {
                                                status: true,
                                                message: "The answer has been successfully set as right answer",
                                                body: result
                                            })
                                        }
                                        
                                    })
                                    
                                    
                                })
                                break;
                            }
                            default :{
                                callback({
                                    status: false,
                                    message: "Unsupported question type"
                                }, null)
                            }
                        }  
                    }
                     
                })
            }

        });

       
    }
}