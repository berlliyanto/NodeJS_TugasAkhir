const mongoose = require('mongoose');

const lifetime = mongoose.model(
    "lifetime", mongoose.Schema(
        {
            machine_id: Number,
            timevalue: Number,
        },
        {
            timestamps: true
        }
    )
);

module.exports = {
    lifetime
}

