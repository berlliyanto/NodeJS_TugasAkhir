const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const preventive = mongoose.model(
    'preventive', mongoose.Schema({
        idorder: {
            type: Number,
            unique: true
        },
        machine_id: Number,
        message: String,
        keterangan: String,
        solved: Boolean
    },
    {
        timestamps: true
    })
);
preventive.plugin(mongooseSequence, { inc_field: 'idorder' });

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