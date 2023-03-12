const authServices = require('../service/auth.services');

//Register / Add User
exports.register = (req, res, next) => {
    authServices.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success Register",
            data: result,
        });
    });
};

//Login
exports.login = (req, res, next) => {
    const { username, password } = req.body;

    authServices.login({ username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success Login",
            data: result,
        });
    });
};

//User Profile
exports.userProfile = (req, res, next) => {
    const body = req.body;
    if (req != null) {
        console.log(res);
    }
    return res.status(200).json({
        message: "Authorized User!",
        body: body
    });

}