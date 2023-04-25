const mongoose = require('mongoose');

const preventive = mongoose.model(
    'preventive', mongoose.Schema({
        machine_id: Number,
        message: String,
        keterangan: String,
        solved: Boolean
    },
    {
        timestamps: true
    })
);

const jadwalPrev = mongoose.model(
    'jadwalprev', mongoose.Schema({
        machine_id:Number,
        jam: Number,
        menit:Number,
        hari:Number,
    })
)

module.exports = {
    preventive,
    jadwalPrev,
}