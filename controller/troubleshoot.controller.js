const TBService = require('../service/troubleshoot.services');

//TRIGGER TB
exports.triggerTB = (req, res, next) =>{
    var model = {
        machine_id: req.body.machine_id,
        from: req.body.from,
        otoritas: req.body.otoritas,
        to: req.body.to,
        message: req.body.message,
        keterangan: "Not Solved",
        solved: false,
    }
    TBService.trigTB(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "success",
                data: result,
            });
        }
    });
}

//GET REQUEST PERBAIKAN
exports.getTB = (req, res, next) =>{
    var model = {
        machine_id: req.query.machine_id,
    }
    TBService.getReqTB(model, (error, result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "success",
                data: result,
            });
        }
    });
}

//UPDATE PEBAIKAN
exports.updateFixed = (req, res, next)=>{
    var model = {
        machine_id: req.query.machine_id,
        idorder: req.query.idorder,
        to: req.body.to,
        keterangan: req.body.keterangan,
        solved: req.body.solved,
    }
    TBService.UpdateTB(model, (error, result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "success",
                data: result,
            });
        }
    })
}