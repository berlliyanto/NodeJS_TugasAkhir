const { lifetime } = require('../models/lifetime.model');
const liftimeService = require('../service/lifetime.service');

exports.trigLT = (req, res, next) => {
    var model = {
        machine_id: req.body.machine_id,
        timevalue: req.body.timevalue
    }
    liftimeService.trigLifetime(model, (error, results) => {
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

exports.getAllLT  = (req, res, next) =>{
    var model = {
        machine_id: req.body.machine_id,
    }
    liftimeService.getLifetime(model,(error,results)=>{
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    })
}

exports.getOneLT  = (req, res, next) =>{
    var model = {
        machine_id: req.query.machine_id,
    }
    liftimeService.getOneLT(model,(error,results)=>{
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    })
}