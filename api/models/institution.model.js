const db = require("../config/db.config");

module.exports = {
    create(payload, callback) {
        // Destructure the name from the payload
        const {name} = payload;

        // Construct the sql statement
        const sql = `INSERT INTO institution (institution_name) VALUES (?)`;

        // Run the query
        db.query(sql, [name], (err, result)=>{
            if(err){
                callback(err, null)
            }else {
                const {insertId} = result;
                const instQuery = `SELECT * FROM institution WHERE id = ? && deleted = 0 LIMIT 1` ;

                db.query(instQuery, [insertId],(err, result)=>{
                    if(err){
                        callback(err, null);
                    }else {
                        callback(null, {
                            status: true,
                            message: "Institution created successfully",
                            body: result
                        })
                    }
                   
                })
                
            }
        })
    },
    all(callback) {
        // Construct the query
        const sql = `SELECT * FROM institution WHERE deleted = 0`;
        // Run the query
        db.query(sql, (err, result)=>{
            if(err){
                callback(err, null)
            }else if(result[0] == undefined){
                callback({
                    status: true,
                    message: "No institution has been created yet"
                })
            }else {
                callback(null, {
                    status: true,
                    message: "Found all institutions in database",
                    body: result
                })
            }
        })
    },
    get(id, callback) {
        // Construct the query
        const sql = `SELECT * FROM institution WHERE id = ? AND deleted = 0`;
        // Run the query
        db.query(sql, id, (err, result)=>{
            if(err){
                callback(err, null)
            }else if(result[0] == undefined){
                callback({
                    status: false,
                    message: "The institution does not exists"
                })
            }else {
                callback(null, {
                    status: true,
                    message: "Here is the institution",
                    body: result[0]
                })
            }
        })
    },
    modify(payload, callback){
        const sql = `UPDATE institution SET institution_name = ? WHERE id = ? AND deleted = 0`;

        db.query(sql, [payload.institution_name, payload.id], (err, result)=>{
            if(err){
                callback(err, null);
            }else {
                callback(null, {
                    status: "true",
                    message: "Institution name was changed successfully",
                    body: result
                })
            }
        })
    },
    delete(id, callback){
        const sql = `UPDATE institution SET deleted = 1 WHERE id = ?`;

        db.query(sql, [id], (err, result)=>{
            if(err){
                callback(err, null);
            }else {
                callback(null, {
                    status: true,
                    message: "The institution has been deleted successfully",
                    body: result
                })
            }
        })
    }
}