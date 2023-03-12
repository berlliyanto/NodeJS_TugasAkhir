const mongoose = require("mongoose");
const {Schema} = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

//DAFTAR USER
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    otoritas:{
        type: String,
        required: true,
    },
    noHp:{
        type: String,
        required: true
    },
});

userSchema.set("toJSON", {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

userSchema.plugin(uniqueValidator, {message: "Username sudah digunakan"});
const User = mongoose.model("users", userSchema);

module.exports = User;