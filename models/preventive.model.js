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
        jam: String,
        menit:String,
        hari:String,
    })
)

module.exports = {
    preventive,
    jadwalPrev,
}