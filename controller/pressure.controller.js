const pressureService = require('../service/pressure.services');
const upload = require("../middleware/upload");
//INPUT PRESSURE
exports.inputPress = (req, res, next)=>{
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                value: req.body.value
            };

            pressureService.inputPressure(model, (error, results) => {
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
}

//PRESSURE GAUGES
exports.pressGauge = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    }
    pressureService.pressureGauges((error, results)=>{
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

//PRESSURE CHART
exports.pressChart = (req, res, next) => {
    var model = {
        parameterId: req.params.id,
    }
    pressureService.pressureChart((error, results)=>{
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

//DELETE PRESSURE
exports.deletePress = (req, res, next) =>{
    var model = {}
    pressureService.deletePressure(model,
        (error, results)=>{
            if(error){
                return next(error);
            }else{
                return res.status(200).send({
                    message: "Success",
                    data: results,
                })
            }
        }
    )
}