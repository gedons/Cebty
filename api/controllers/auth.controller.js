const User = require("../models/user.model");
const {secret} = require("../config/jwt.config"); //The JWT secret
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Exportable methods
module.exports = {
    // Sign up controller method
    signUp: (req, res)=>{
        // Get the needed variable from the request body
        const {
            phoneNumber,
            password, 
            email, 
            institutionId
        } = req.body;

        if(phoneNumber && password && email && institutionId){
            // Define a new user
            const data = {
                phoneNumber,
                password,
                email,
                institutionId
            }; 

            const user = new User(data);

            // Create the user
            User.create(user, (err, result)=>{
                // Check for errors
                if(err){
                    return res.send(err);
                }else {
                    // Check for other errors
                    if(result.status == "false"){
                        // Send the error message
                        return res.send(result);
                    }else {
                        // Everything okay, then send the verifyed data and token
                        jwt.sign(data, secret, (err, token)=>{
                            // If an error occured, let the developer know
                            if(err){
                                return res.send({
                                    status: "false",
                                    message: "An error occured",
                                    err
                                });
                            }else {
                                // We're good, so send the jwt token
                                return res.send({
                                    token
                                });
                            }
                        });
                        
                    }
                    
                }
            })

        }else {
            // The credentials are correct so send an error message
            return res.json({
                status: false,
                message: "Please provide all credentials",
                payload: req.body
            });
        }
    },

    // Sign in controller method
    signIn: (req, res)=>{
        // Get the phone number or email and password
        const {phoneNumber, email, password} = req.body;
        if((phoneNumber || email) && password){
            User.exists({phoneNumber, email}, (err, result)=>{
                if(err){
                    // An error occured
                    return res.send(err);
                }else {
                    // Now validate the password

                    const passwordDB = result.body[0].password;
                    const passwordDecrypted = crypto.createHash("md5").update(password).digest("hex");

                    if(passwordDecrypted == passwordDB){
                        const {
                            id,
                            phone_number,
                            password,
                            email,
                            institution_id,
                            role
                        } = result.body[0];

                        jwt.sign({
                            id,
                            role,
                            phoneNumber,
                            password,
                            email,
                            institution_id
                        }, secret, (err, token)=>{
                            // If an error occured, let the developer know
                            if(err){
                                return res.send({
                                    status: false,
                                    err
                                });
                            }else {
                                
                                // We're good, so send the jwt token
                                
                                return res.send({
                                    status: true,
                                    id,
                                    phoneNumber,
                                    email,
                                    role,
                                    institutionId: institution_id,
                                    token
                                });
                            }
                        });
                    }else {
                        return res.send({
                            status: false,
                            message: "User exists but the password is invalid"
                        });
                    }
                   
                }
            });
        }else {
            return res.json({
                status: false,
                message: "Please provide all credentials",
                payload: req.body
            });
        }
    },
    candidateToken(req, res){
        jwt.sign({
           secret
        }, secret, (err, token)=>{
            // If an error occured, let the developer know
            if(err){
                return res.send({
                    status: false,
                    err
                });
            }else {
                
                // We're good, so send the jwt token
                
                return res.send({
                    status: true,
                    token
                });
            }
        });
    }
};