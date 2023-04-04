const priceService = require('../service/costprice.services');

//INPUT PRICE LIST
exports.inputPrice = (req, res, next) =>{
    var model = {
        tipe: req.body.tipe,
        name_baku1: req.body.name_baku1,
        name_baku2: req.body.name_baku2,
        name_baku3: req.body.name_baku3,
        price_baku1: req.body.price_baku1,
        price_baku2: req.body.price_baku2,
        price_baku3: req.body.price_baku3,
        price_total: req.body.price_total,
    }

    priceService.insertPrice(model,(error,result)=>{
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

//GET PRICE LIST
exports.getPrice = (req, res, next)=>{
    var model = {}
    priceService.getPricelist(model,(error,result)=>{
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