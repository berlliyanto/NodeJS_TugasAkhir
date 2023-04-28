const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const preventiveSchema = new mongoose.Schema({
        idpreventive: {
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
preventiveSchema.plugin(mongooseSequence, { inc_field: 'idpreventive' });
const preventive = mongoose.model('preventive', preventiveSchema);

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