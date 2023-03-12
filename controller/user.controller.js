const userServices = require("../service/user.services");
const upload = require("../middleware/upload");

//INSERT DATA
exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                otoritas: req.body.otoritas,
                noHp: req.body.noHp
            };

            userServices.createUser(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success Insert",
                        data: results
                    });
                }
            });
        }
    });
};

//READ ALL DATA
exports.findAll = (req, res, next) => {
    var model = {
        username: req.query.username,
    };

    userServices.getUser(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success Read All Data",
                data: results
            });
        }
    });
};

// READ SINGLE DATA
exports.findOne = (req, res, next) => {
    var model = {
        userId: req.params.id,
    };

    userServices.getUsersbyId(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success Read Single Data",
                data: results
            });
        }
    });
};

// UPDATE DATA
exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                userId: req.params.id,
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                otoritas: req.body.otoritas,
                noHp: req.body.noHp
            };
            userServices.updateUser(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success Update",
                        data: results
                    });
                }
            });
        }
    });
};

//DELETE DATA
exports.delete = (req, res, next) => {
    var model = {
        userId: req.params.id,
    };
    userServices.deleteUser(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success Delete",
                data: results
            });
        }
    });
};

