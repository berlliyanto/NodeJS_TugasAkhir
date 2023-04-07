const oeeService = require('../service/oee.services');

let date = new Date(); // Menggunakan tanggal yang telah ditentukan sebelumnya
let localTime = date.getTime() - (date.getTimezoneOffset() * 60000); // Mengonversi ke waktu setempat dengan menyesuaikan offset waktu lokal
let localDate = new Date(localTime);
let nowdate = localDate.toLocaleString('id', { timeZone: 'UTC' });

exports.OEE = (req, res, next) => {
    var model = {
        machine_id: req.body.machibe_id,
        tanggal: nowdate,
        quality: 0,
        performance: 0,
        availability: 0,
        oee: 0,
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

