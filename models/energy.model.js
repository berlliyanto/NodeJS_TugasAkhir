const mongoose = require("mongoose");

const energy = mongoose.model(
    "energy",
    mongoose.Schema({
        voltage: Number,
        current: Number,
        power: Number,
        energy: Number,
        frequency: Number,
        pf: Number,
    },
    {
        timestamps: true,
    }
    )
);

module.exports = {
    energy
}