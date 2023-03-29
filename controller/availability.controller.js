const availabilityService = require('../service/availability.services');

//TRIGGER DATA AVAIALABILITY
exports.trigAvai = (req, res , next)=>{
    var model = {
        machine_id: req.body.machine_id,
        operationtime: 0,
        downtime: 0,
        runningtime: 0,
        availabilityrate: 0,
        state: 1,
    }

    availabilityService.trigAvailability(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: result,
            });
        }
    });
}

exports.latestAvai = (req, res, next)=>{
    var model = {
        machine_id: req.query.machine_id
    }
    availabilityService.getAvaiLatest(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: result,
            });
        }
    })
}