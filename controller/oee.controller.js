const oeeService = require('../service/oee.services');
const upload = require("../middleware/upload");

let date = new Date(); // Menggunakan tanggal yang telah ditentukan sebelumnya
let localTime = date.getTime() - (date.getTimezoneOffset() * 60000); // Mengonversi ke waktu setempat dengan menyesuaikan offset waktu lokal
let localDate = new Date(localTime);
let nowdate = localDate.toLocaleString('id', { timeZone: 'UTC' });


exports.good = (req, res, next) => {
    oeeService.Vquality((error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                data: results,
            })
        }
    })
}

exports.OEE = (req, res, next) => {
    var loadingtime = req.body.availabilitytime - req.body.planneddown
    var avblty = ((loadingtime - req.body.downtime) / loadingtime);
    var qlty = ((req.body.processed - req.body.defect) / req.body.processed)
    var pfrmnc = ((req.body.processed*req.body.cycletime) / req.body.operationtime);
    var model = {
        machine_id: req.body.machine_id,
        tanggal: nowdate,
        operationtime: req.body.operationtime,
        downtime: req.body.downtime,
        runningtime: req.body.runningtime,
        cycletime: req.body.cycletime,
        good: req.body.good,
        defect: req.body.defect,
        processed: req.body.processed,
        availability: avblty,
        quality: qlty,
        performance: pfrmnc,
        nilaioee: avblty * qlty * pfrmnc,
        hasiloee: req.body.hasiloee,
        state: req.body.state,
    };
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
