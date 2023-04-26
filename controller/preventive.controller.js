const notifikasiService = require('../service/preventive.service');

//--------------NOTIFIKASI 5 MENIT SIDANG----------------------//
exports.getNotif5Menit = async (req, res ,next) => {
    const machine_id = [1,2,3,4];
    try {
        const latestdata = await notifikasiService.getNotifikasiFiveMenit(machine_id);
        res.status(200).send({
            message: "Success",
            data: latestdata
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getNotifikasi = (req, res, next)=>{
    var model = {
        machine_id:req.query.machine_id,
    }
    notifikasiService.getNotifikasi(model,(error,result)=>{
        if(error){
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: result
            })
        }
    });
}

//-------------------PREVENTIVE MAINTENANCE----------------------//

exports.updatePrevStatus = (req, res , next) =>{
    var model = {
        machine_id: req.query.machine_id,
        keterangan: req.body.keterangan,
        _id: req.body._id,
    }
    notifikasiService.updatePreventive(model, (error,result)=>{
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

exports.getPreventive = (req, res, next) =>{
    var model = {
        machine_id: req.query.machine_id,
    }
    notifikasiService.getPreventive(model,(error,result)=>{
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

exports.updateJadwalPrev = (req, res, next) =>{
    var model = {
        machine_id: req.body.machine_id,
        hari: req.body.hari,
        jam: req.body.jam,
        menit: req.body.menit
    }
    notifikasiService.jadwalPreventive(model, (error, result)=>{
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

exports.getJadwalPrev = (req, res, next) => {
    var model = {
        machine_id: req.query.machine_id,
    }
    notifikasiService.getJadwalPrev(model,(error,result)=>{
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