const jwt = require('jsonwebtoken');

exports.createToken = payload =>{
    const jwtOption = { expiresIn : '1d', issuer: 'picknroll' };
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (error, token)=>{
            if(error) reject(error);
            resolve(token);
        });
    });
};

exports.verifyToken = token => {
    return new Promise((resolve, reject) =>{
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
            if(error) reject(error);
            resolve(decoded);
        });
    });
}