const db = require('../config/db.config');

function User(param) {
    this.email = param.email;
    this.phoneNumber = param.phoneNumber;
    this.password = param.password;
    this.institutionId = param.institutionId;
}

User.create = (user, callback)=>{
    const sql = `INSERT INTO user (email, phone_number, password, institution_id) VALUES (?, ?, MD5(?), ?)`;

    db.query(
        sql, 
        [   
            user.email,
            user.phoneNumber,
            user.password, 
            user.institutionId
        ], 
        (err, result) =>{

        if(err){
            callback(err, null);
        }

        callback(null, {
            status: "true",
            message: "User created successfully",
            body: result
        });
    });
}

User.all = ({institutionId}, callback) => {
    const sql = `SELECT * FROM user WHERE institution_id = ? AND deleted = 0`;

    db.query(sql, [institutionId], (err, result) =>{
        if(err){
            callback(err, null);
        }

       
        callback(null, {
            status: true,
            message: "Users found",
            body: result
        });
    
    });
}

User.exists = (payload, callback)=>{
    let sql;

   
    sql = `SELECT * FROM user AS a LEFT JOIN institution AS b on a.institution_id = b.id WHERE a.email = '${payload.email}' OR a.phone_number = '${payload.phoneNumber}' AND b.deleted = 0 AND a.deleted = 0`;
    


    db.query(sql, (err, result)=>{
        if(err){
            callback(err, null);
            return;
        }else if(result.length == 0){
           callback({
                status: false,
                message: `There is no user with that parameter` 
           });
           return;
        }else {
            callback(null, {
                status: true,
                message: 'User found',
                body: result
            });
            return;
        }
    })

    return;
}

User.edit = (payload, callback)=>{
    const {id, phone_number, email, password} = payload;
    if(id && phone_number && email && password){
        const sql = `UPDATE user SET phone_number = ?, email = ?, password = MD5(?) WHERE id = ?`;
        db.query(sql, [phone_number, email, password, id], (err, result)=>{
            if(err){
                callback(err, null);
            }else {
                callback(null, {
                    status: true,
                    message: 'User data has been modified successfully',
                    body: result
                })
            }
        })
    }else {
        callback({
            status: false,
            message: 'Please provide all parameters'
        })
    }
}

User.delete = ({userId}, callback)=>{
    const sql = `UPDATE user SET deleted = 1 WHERE id = ?`;
    db.query(sql, [userId], (err, result)=>{
        if(err){
            callback(err, null);
        }else {
            callback(null, {
                status: true,
                message: 'User data has been deleted successfully',
                body: result
            })
        }
    })
}


module.exports = User;