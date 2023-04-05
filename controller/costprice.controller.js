const costpriceService = require('../service/costprice.services');

let date = new Date(); // Menggunakan tanggal yang telah ditentukan sebelumnya
let localTime = date.getTime() - (date.getTimezoneOffset()*60000); // Mengonversi ke waktu setempat dengan menyesuaikan offset waktu lokal
let localDate = new Date(localTime);
let nowdate = localDate.toLocaleString('id', { timeZone: 'UTC' });

//TRIGGER COST
exports.triggerCost = (req, res, next) =>{
    var model = {
        machine_id: req.body.machine_id,
        tanggal: nowdate,
        tipe: " ",
        good: 0,
        harga_unit: 0,
        total_harga: 0,
        state: 1,

    }

    costpriceService.trigCost(model,(error,result)=>{
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
    costpriceService.getPricelist(model,(error,result)=>{
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

//GET COST
exports.getCostM = (req, res, next)=>{
    var model = {
        m_id: req.query.machine_id
    }
    costpriceService.getCost(model,(error,result)=>{
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

//RESET COST
exports.resetCP = (req, res, next)=>{
    var model = {
        m_id: req.query.machine_id
    }
    costpriceService.resetCost(model,(error,result)=>{
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