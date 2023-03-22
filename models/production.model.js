
// TIDAK DI PAKAI..........................

const mongoose = require("mongoose");

const production = mongoose.model(
    "production",
    mongoose.Schema({
        machine_id: Number,
        tipeBenda: String,
        processed: Number,
        status:Number,
        state: Number,
    },
    {
        timestamps: true,
    }
    )
);
module.exports = {
    production,
};