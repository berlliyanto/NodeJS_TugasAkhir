const performanceService = require('../service/performance.services');

//Trigger Performance
exports.triggerPerform = (req, res, next)=>{
    var model = {
        machine_id: req.body.machine_id,
        cycle_time: 0,
        processed: 0,
        operationtime: 0,
        performancerate: 0,
        state: 1
    }
    performanceService.trigPerformance(model,(error,result)=>{
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

//Reset Performance State
exports.resetPerform = (req, res, next)=>{
    var model = {
        machine_id: req.body.machine_id,
    }
    performanceService.resetPerformance(model,(error,result)=>{
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