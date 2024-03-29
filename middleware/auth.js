const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token =  authHeader && authHeader.split(" ")[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, "Berli_SecretKEY", (err,user)=>{
        if(err) return res.sendStatus(403);
        req.users = user;
        next();
    });
}

function generateAccessToken(username){
    return jwt.sign({data: username}, "Berli_SecretKEY", {
        expiresIn: "2h",
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken,
};