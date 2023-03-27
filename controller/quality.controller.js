const qualityService = require('../service/quality.services');

//TRIGGER QUALITY FOR COUNTING
exports.triggerQuality = (req, res, next) =>{
    var model = {
        machine_id : req.body.machine_id,
        tipe: req.body.tipe,
        good: 0,
        defect: 0,
        processed: 0,
        qualityrate: 0,
        state: 1
    }

    qualityService.firstQuality(model,(error, result)=>{
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

//GET DATA QUALITY TERBARU
exports.getProcessData = (req, res, next)=>{
    var model ={
        m_id: req.query.m_id,
        tipe: req.query.tipe,
    }
    qualityService.getProcessed(model,(error,result)=>{
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

//GET DATA FOR RECORD QUALITY
exports.getRecQuality = (req, res, next)=>{
    var model = {
        m_id : req.query.m_id
    }
    
    qualityService.recQuality(model,(error, result)=>{
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

//GET 4 DATA FOR DASHBOARD QUALITY
exports.getDashQuality = async (req, res, next)=>{
    const machine_id = [1,2,3,4];
    try {
        const latestdata = await qualityService.dashQuality(machine_id);
        res.status(200).send({
            message: "Success",
            data: latestdata
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//UPDATE PROCESSED DATA
exports.processedUnit = (req, res, next)=>{
    var model ={
        m_id: req.query.m_id,
        tipe: req.query.tipe,
    }

    qualityService.processed(model,(error,result)=>{
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

//RESET STATE QUALITY
exports.resetQuality = (req, res , next)=>{
    var model = {
        m_id: req.query.m_id
    }
    qualityService.resetQuality(model,(error,result)=>{
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

//UPDATE DEFECT DATA
exports.defectUnit = (req, res ,next)=>{
    var model ={
        m_id: req.query.m_id,
        tipe: req.query.tipe,
        defect: req.body.defect,
    }

    qualityService.Defect(model, (error,result)=>{
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