
const productionServices = require("../service/production.services");

//INSERT DATA M1
exports.processed = (req, res, next) => {
    var model = {
        machine_id: req.body.machine_id,
        tipeBenda: req.body.tipeBenda,
        processed: 1,
        status: 1,
        state: 1
    };
    productionServices.inputProcessed(model, (error, results) => {
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

//GET VALUE PROCESSED 
exports.getProcessed = (req, res, next)=>{
    var model = {
        tipe: req.query.tipe,
        machine_id:req.query.machine_id,
        state:req.query.state,
        status:req.query.status
    }
    productionServices.getProcessed(model,
        (error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data:result
            })
        }
    })
}

//DELETE DATA
exports.delete = (req,res,next)=>{
    productionServices.deleteData((error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message:"success"
            })
        }
    })
}

exports.resetProcessed = (req, res, next)=>{
    var model = {
        m_id : req.query.m_id,
        state : req.body.state
    }
    productionServices.resetProcess(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: result
            })
        }
    })
    
}

