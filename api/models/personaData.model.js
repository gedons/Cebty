const db = require("../config/db.config");

module.exports = {
    create(payload, callback){
        /*
            {
                testId: test_id,
                personaData: data,
                personaFieldType: field_type,
                isRequired: false,
                isUnique: false

            }
        */

        const { personaData, personaFieldType, isUnique, isRequired, testId } = payload;
       
        const sql = `INSERT INTO candidate_persona(persona_data, persona_field_type, is_required, is_unique, test_id) VALUES (?,?,?,?,?)`;
        

        db.query(sql, [personaData, personaFieldType, isRequired, isUnique, testId], (err, result)=>{
            if(err){
                callback({
                    status: false,
                    message: 'An error occured while trying to create the persona data',
                    err
                })
            }else {
                const {insertId} = result;
                const retrieveSql = `SELECT * FROM candidate_persona WHERE id =?`;
                db.query(retrieveSql, [insertId], (err, result)=>{
                    if(err){
                        callback({
                            status: false,
                            message: 'Could not get the persona data after creating it',
                            err
                        })
                    }else {
                         callback({
                            status: true,
                            message: 'Successfully created persona data',
                            body: result
                        })
                    }
                })
               
            }
        })


    },
    edit(payload, callback){
                /*
            {
                test_id: test_id,
                persona_data: data,
                persona_field_type: field_type,
                is_required: false,
                is_unique: false

            }
        */

        const args = {
            persona_data: payload.persona_data,
            persona_field_type: payload.persona_field_type,
            is_required: payload.is_required,
            is_unique: payload.is_unique,
            id: payload.id
        }   
       
        const sql = `UPDATE candidate_persona SET persona_data = ?, persona_field_type = ?, is_required = ?, is_unique = ? WHERE id = ? AND deleted = 0`;
        

        db.query(sql, Object.values(args), (err, result)=>{
            if(err){
                callback({
                    status: false,
                    message: 'An error occured while trying to edit the persona data',
                    err
                })
            }else {
               
                     callback({
                        status: true,
                        message: 'Successfully edit persona data',
                        body: result
                    });
                   
            }
               
            
        })


    },
    delete({id}, callback){
       
        const sql = `UPDATE candidate_persona SET deleted = 1 WHERE id = ? AND deleted = 0`;
        
        db.query(sql, [id], (err, result)=>{
            if(err){
                callback({
                    status: false,
                    message: 'An error occured while trying to delete the persona data',
                    err
                })
            }else {
               
                     callback({
                        status: true,
                        message: 'Successfully deleted persona data',
                        body: result
                    });
                   
            }
               
            
        })


    },
    all({test_id}, callback){
        const sql = `SELECT * FROM candidate_persona WHERE test_id = ? AND deleted = 0`;

        db.query(sql, [test_id], (err, data)=>{
            if(err){
                return callback(err, null);
            }else {
                return callback(null, {
                    status: true,
                    message: "Found data pertaining to test persona in database",
                    data
                })
            }
        })
    }
}