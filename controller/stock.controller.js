const upload = require("../middleware/upload");
const stockServices = require("../service/stock.services");

let date = new Date(); // Menggunakan tanggal yang telah ditentukan sebelumnya
let localTime = date.getTime() - (date.getTimezoneOffset() * 60000); // Mengonversi ke waktu setempat dengan menyesuaikan offset waktu lokal
let localDate = new Date(localTime);
let nowdate = localDate.toLocaleString('id', { timeZone: 'UTC' });

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

//TAMBAH JUMLAH BAHAN MESIN 
exports.add = (req,res,next) =>{
    var model = {
        m_id: req.query.m_id,
        A: req.body.A,
        B: req.body.B,
        C: req.body.C,
    }
    stockServices.stockAdd(model,(error,results)=>{
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

//KURANG JUMLAH BAHAN MESIN 
exports.min = (req, res, next)=>{
    var model ={
        m_id: req.query.m_id,
        A: req.query.A,
        B: req.query.B,
        C: req.query.C,
    }
    stockServices.kurangiStock(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message:"Succes Kurangi",
                data:result
            })
        }
    })
}

//-----------------------------RIWAYAT----------------------------------------//

//INSERT DATA
exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            var model = {
                machine_id: req.body.machine_id,
                tipe: req.body.tipe,
                jumlah: req.body.jumlah,
                dibuat: nowdate
            };

            stockServices.riwayatStock(model, (error, results) => {
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

//RIWAYAT MESIN 1
exports.riwayatStockM1 = (req, res, next) => {
    var model = {
        stockId: req.params.id,
    }
    stockServices.historyM1(model,(error, results)=>{
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