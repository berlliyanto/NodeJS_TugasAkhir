const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const troubleshootSchema = new mongoose.Schema({
    idorder: {
        type: Number,
        unique: true
    },
    machine_id: Number,
    from: String,
    otoritas: String,
    to: String,
    message: String,
    keterangan: String,
    solved: Boolean,
}, { timestamps: true });

troubleshootSchema.plugin(mongooseSequence, { inc_field: 'idorder' });

const troubleshoot = mongoose.model('troubleshoot', troubleshootSchema);

module.exports = troubleshoot;
