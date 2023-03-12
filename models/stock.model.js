const mongoose = require("mongoose");

const stock = mongoose.model(
    "stock",
    mongoose.Schema({
        machine_id: Number,
        A: Number,
        B: Number,
        C: Number,
    },
    {
        timestamps: true,
    }
    )
);

module.exports = {
    stock
}