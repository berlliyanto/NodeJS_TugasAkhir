const statusService = require('../service/status.services');
const upload = require('../middleware/upload');

//INSERT DATA
exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                machine_id: req.body.machine_id,
                status:req.body.status
            };

            statusService.createStatus(model, (error, results) => {
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
//READ DATA MESIN 
exports.status = (req, res, next) => {
    var model = {
        status: req.body.status
    }
    statusService.getstatusM(model,(error, results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    });
};

//READ DATA MESIN 1
exports.statusM1 = (req, res, next) => {
    var model = {
        status: req.body.status
    }
    statusService.getstatusM1(model,(error, results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    });
};

//READ DATA MESIN 2
exports.statusM2 = (req, res, next) => {
    var model = {
        status: req.body.status
    }
    statusService.getstatusM2(model,(error, results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    });
};

//READ DATA MESIN 3
exports.statusM3 = (req, res, next) => {
    var model = {
        status: req.body.status
    }
    statusService.getstatusM3(model,(error, results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    });
};

//READ DATA MESIN 4
exports.statusM4 = (req, res, next) => {
    var model = {
        status: req.body.status
    }
    statusService.getstatusM4(model,(error, results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    });
};

//UPDATE STATUS
exports.updateSM1 = (req,res,next)=>{
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                status: req.body.status
            };

            statusService.setStatusM1(model, (error, results) => {
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

exports.updateSM2 = (req,res,next)=>{
    var model = {
        status: req.body.status
    }
    statusService.setStatusM2(model,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Berhasil",
                data: results
            })
        };
    });
};


