const mongoose = require("mongoose");

const parameter = mongoose.model(
    "parameters",
    mongoose.Schema({
        machine_id: Number,
        loading_time: Number,
        cycle_time: Number,
        oee_target: Number,
        harga_perUnit: Number,
        tipe_benda: String,
        state: Number,
    },
    {
        timestamps: true,
    }
    )
);

module.exports = {
    parameter
}