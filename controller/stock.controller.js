
const upload = require("../middleware/upload");
const stockServices = require("../service/stock.services");

//INSERT DATA
exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                machine_id: req.body.machine_id,
                A: req.body.A,
                B: req.body.B,
                C: req.body.C,
            };

            stockServices.createstock(model, (error, results) => {
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

//READ ALL DATA
exports.findAll = (req, res, next) => {
    var model = {
        machine_id: req.query.machine_id,
    };

    stockServices.getstock(model, (error, results) => {
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


//DELETE DATA
exports.delete = (req, res, next) => {
    var model = {
        stockId: req.params.id,
    };

    stockServices.deletestock(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};

//READ DATA MESIN 1
exports.M1 = (req, res, next) => {
    var model = {
        stockId: req.params.id,
    }
    stockServices.stock1(model,(error, results)=>{
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

//READ DATA MESIN 2
exports.M2 = (req, res, next) => {
    var model = {
        stockId: req.params.id,
    }
    stockServices.stock2(model,(error, results)=>{
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

//TAMBAH JUMLAH BAHAN MESIN 1
exports.addM1 = (req,res,next) =>{
    var model = {
        A: req.body.A,
        B: req.body.B,
        C: req.body.C
    }
    stockServices.stockAddM1(model,(error,results)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data:results
            })
        }
    })
}