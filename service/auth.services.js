const User = require("../models/auth.model");
const auth = require('../middleware/auth');

// LOGIN
async function login({ username, password }, callback) {
    const user = await User.findOne({username});
    if (user != null) {
            if(password == user.password){
                console.log("Success Login");
                const token = auth.generateAccessToken(username);
                return callback(null, {...user.toJSON(), token });
            } else{
                return callback({
                    message: "Username atau Password Salah!"
                })
            }      
    } else {
        return callback({
            message: "Username atau Password Salah!"
        });
    }
    
}

//Register / Add User
async function register(params, callback) {
    if (params.username === undefined) {
        return callback({
            message: "Username Required"
        });
    }

    const user = new User(params);
    user
    .save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

module.exports = {
    login,
    register,
}