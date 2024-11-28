const jwt = require("jsonwebtoken");
const {secret} = require("../config/jwt.config");

// This is a middleware to verify JWT tokens that are sent to route
module.exports = {
    verifyToken: (req, res, next) => {
        const {authorization} = req.headers;
        
        if(authorization === undefined){
            res.sendStatus(401);
        }else {
                // Authorization: bearer <<token>>
                const token = authorization.split(" ")[1];
            
                try {
                    // Assign the data gotten to the request token property
                    req.token = jwt.verify(token, secret);
                }catch(e){
                    // An error occured
                    res.send({
                        status: false,
                        error: e
                    });
                }

                // Call the next function
                next();
                
        }
        
    }
}