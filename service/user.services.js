// const { user_list } = require("../models/app.models");
const User = require("../models/auth.model");


// CREATE DATA
async function createUser(params, callback) {
    if (!params.username) {
        return callback({
            message: "Username & Email Required",
        }),
            ""
    };
    const userModel = User(params);
    userModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//READ DATA
async function getUser(params, callback) {
    const userName = params.username;
    var condition = userName
        ? {
            username: { $regex: new RegExp(userName), $option: "i" },
        }
        : {};
    User
        .find(condition)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//READ DATA by ID
async function getUsersbyId(params, callback) {
    const UserId = params.userId;
    User
        .findById(UserId)
        .then((response) => {
            if (!response) callback("User Id Invalid");
            else return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//UPDATE DATA
async function updateUser(params, callback) {
    const UserId = params.userId;
    User
        .findByIdAndUpdate(UserId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("User ID invalid");
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//DELETE DATA
async function deleteUser(params, callback) {
    const UserId = params.userId;
    User
        .findByIdAndRemove(UserId)
        .then((response) => {
            if (!response) callback("User ID invalid");
            else return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUsersbyId,
};