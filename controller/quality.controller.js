const qualityService = require('../service/quality.services');

exports.Quality = (req, res, next)=>{
    var model = {
        defect: req.body.defect,
        tipe: req.query.tipe,
        m_id: req.query.m_id,
    }
    qualityService.insertProcessed(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "succes",
                data: result
            })
        }
    })
}

