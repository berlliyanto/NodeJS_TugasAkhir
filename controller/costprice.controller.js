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
//GET COST Histori
exports.getCostHistori = (req, res, next)=>{
    var model = {
        m_id: req.query.machine_id
    }
    costpriceService.getCostHistory(model,(error,result)=>{
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

//GET 4 DATA FOR DASHBOARD COST PRICE
exports.getDashCost = async (req, res, next)=>{
    const machine_id = [1,2,3,4];
    try {
        const latestdata = await costpriceService.dashCost(machine_id);
        res.status(200).send({
            message: "Success",
            data: latestdata
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//UBAH HARGA MATERIAL
exports.updateHargaMaterial = (req, res ,next)=>{
    var model = {
        tipe : req.body.tipe,
        price_baku1 : req.body.price_baku1,
        price_baku2 : req.body.price_baku2,
        price_baku3 : req.body.price_baku3,
    }
    costpriceService.updateHarga(model,(error,result)=>{
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