const mongoose = require("mongoose");

const availability = mongoose.model(
    "availability",
    mongoose.Schema({
        machine_id: Number,
        operationtime: Number,
        downtime: Number,
        runningtime: Number,
        state: Boolean,
    },
    {
        timestamps: true,
    }
    )
);

const performance = mongoose.model(
    "performance",
    mongoose.Schema({
        machine_id: Number,
        operationtime: Number,
        cycletime: Number,
        flawless: Number,
        state: Boolean,
    },
    {
        timestamps: true,
    }
    )
);

const quality = mongoose.model(
    "quality",
    mongoose.Schema({
        machine_id: Number,
        flawless: Number,
        defect: Number,
        processed: Number,
        state: Boolean,
    },
    {
        timestamps: true,
    }
    )
);

const oee = mongoose.model(
    "oee",
    mongoose.Schema({
        machine_id: Number,
        nilaioee: Number,
        hasiloee: String,
        state: Boolean,
    },
    {
        timestamps: true,
    }
    )
);

module.exports = {
    availability,
    performance,
    quality,
    oee
}