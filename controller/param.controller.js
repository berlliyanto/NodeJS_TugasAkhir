
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

//RESET PARAMETER M1
exports.ResetM1 = (req, res, next) => {
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

//GET 4 DATA FOR REPORT
exports.getDashParam = async (req, res, next)=>{
    const machine_id = [1,2,3,4];
    try {
        const latestdata = await parameterServices.dashParam(machine_id);
        res.status(200).send({
            message: "Success",
            data: latestdata
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getParamHistori = (req, res, next)=>{
    var model = {
        m_id: req.query.machine_id
    }
    parameterServices.paramHistori(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: result,
            })
        }
    })
}

//RESET PARAMETER M2
exports.ResetM2 = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                state: req.body.state
            };
            parameterServices.resetParamM2(model, (error, results) => {
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

//RESET PARAMETER M3
exports.ResetM3 = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                state: req.body.state
            };
            parameterServices.resetParamM3(model, (error, results) => {
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

//RESET PARAMETER M4
exports.ResetM4 = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                state: req.body.state
            };
            parameterServices.resetParamM4(model, (error, results) => {
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

//READ DATA TERBARU MESIN 3
exports.latestM3 = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    }
    parameterServices.latestParameter3(model,(error, results)=>{
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

//READ DATA TERBARU MESIN 4
exports.latestM4 = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    }
    parameterServices.latestParameter4(model,(error, results)=>{
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