
const upload = require("../middleware/upload");
const parameterServices = require("../service/param.services");

//INSERT DATA
exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                machine_id: req.body.machine_id,
                loading_time: req.body.loading_time,
                cycle_time: req.body.cycle_time,
                oee_target: req.body.oee_target,
                harga_perUnit: req.body.harga_perUnit,
                tipe_benda: req.body.tipe_benda,
                state: req.body.state
            };

            parameterServices.createParameter(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });
        }
    });
};

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                state: req.body.state
            };
            parameterServices.resetParam(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success Reset",
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
        machine_id: req.query.machine_id,
    };

    parameterServices.getParameter(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

// READ SINGLE DATA
exports.findOne = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    };

    parameterServices.getParameterbyId(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};

//DELETE DATA
exports.delete = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    };

    parameterServices.deleteParameter(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};

//READ DATA TERBARU MESIN 1
exports.latestM1 = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    }
    parameterServices.latestParameter1(model,(error, results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    })
}

//READ DATA TERBARU MESIN 2
exports.latestM2 = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    }
    parameterServices.latestParameter2(model,(error, results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    })
}