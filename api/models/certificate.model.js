const db = require("../config/db.config");

module.exports = {
    create(payload, callback){
        const sql = `INSERT INTO certificate(certificate_name, cuttoff_mark, html) VALUES (?,?,?)`;

        db.query(sql, [payload.name, payload.cuttoffMark, payload.html], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'An error occurred',
                    err
                });
            }else {
                const { insertId } = result;
                const sql = `SELECT * FROM certificate WHERE id = ?`;
                db.query(sql, [insertId], (err, result)=>{
                    if(err){
                        return callback({
                            status: false,
                            message: 'An error occurred',
                            err
                        });
                    }else {
                        return callback(null, {
                            status: true,
                            message: 'Created certificate',
                            body: result
                        });
                    }
                });
            }
        })
    },
    edit(payload, callback){
        const sql = `UPDATE certificate SET certificate_name = ?, cutoff_mark = ?, html = ? WHERE id = ?`;
        db.query(sql, [payload.certificate_name, payload.cuttoff_mark, payload.html, payload.id], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'An error occurred',
                    err
                });
            }else {
                return callback(null, {
                    status: true,
                    message: 'Updated certificate',
                    body: result
                });
            }
        })

    },
    all(payload, callback){
        const sql = `SELECT * FROM certificate WHERE test_id = ?`;

        db.query(sql, [payload.testId], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'An error occurred',
                    err
                });
            }else {
                return callback(null, {
                    status: true,
                    message: 'retrieved certificates',
                    body: result
                });
            }
        })
    },
    delete(payload, callback){
        const sql = `UPDATE certificate SET deleted = 1 WHERE id = ?`;

        db.query(sql, [payload.id], (err, result)=>{
            if(err){
                return callback({
                    status: false,
                    message: 'An error occurred',
                    err
                });
            }else {
                return callback(null, {
                    status: true,
                    message: 'deleted certificate',
                    body: result
                });
            }
        })


    }
}