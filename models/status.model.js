const mongoose = require('mongoose');

const status = mongoose.model(
    "status_mesin",
    mongoose.Schema({
        machine_id: Number,
        status: Number
    },
    )
);

module.exports = {
    status
}