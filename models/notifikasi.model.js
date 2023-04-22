const mongoose = require('mongoose');

const notifikasi = mongoose.model(
    'notifikasi', mongoose.Schema({
        machine_id: Number,
        time: Number,
        trigger: Boolean,
    },{
        timestamps: true
    })
);

module.exports = {
    notifikasi,
}