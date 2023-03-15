const mongoose = require('mongoose');

const pressure = mongoose.model(
    "pressure", mongoose.Schema({
        value: Number,
    },
    {
        timestamps: true
    }
    )
);

module.exports = {
    pressure,
}