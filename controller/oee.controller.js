const oeeService = require('../service/oee.services');

let date = new Date(); // Menggunakan tanggal yang telah ditentukan sebelumnya
let localTime = date.getTime() - (date.getTimezoneOffset() * 60000); // Mengonversi ke waktu setempat dengan menyesuaikan offset waktu lokal
let localDate = new Date(localTime);
let nowdate = localDate.toLocaleString('id', { timeZone: 'UTC' });

exports.OEE = (req, res, next) => {
    var model = {
        machine_id: req.body.machine_id,
        tanggal: nowdate,
        quality: 0,
        performance: 0,
        availability: 0,
        nilaioee: 0,
        state: 1
    }
    oeeService.createoee(model, (error, results) => {
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

exports.resetOee  = (req, res, next) =>{
    var model = {
        machine_id: req.body.machine_id,
    }
    oeeService.resetOEE(model,(error,results)=>{
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    })
}

exports.getResultOEE = (req, res, next) =>{
    var model = {
        machine_id: req.query.machine_id,
    }
    oeeService.getOEE(model,(error,results)=>{
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    })
}

exports.getDashOEE= async (req, res, next)=>{
    const machine_id = [1,2,3,4];
    try {
        const latestdata = await oeeService.dashOEE(machine_id);
        res.status(200).send({
            message: "Success",
            data: latestdata
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getOEEHistori = (req, res, next)=>{
    var model = {
        m_id: req.query.machine_id
    }
    oeeService.getOEEHistory(model,(error,result)=>{
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

