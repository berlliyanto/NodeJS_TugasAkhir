const mongoose = require("mongoose");

const availability = mongoose.model(
    "availability",
    mongoose.Schema({
        machine_id: Number,
        operationtime: Number,
        downtime: Number,
        runningtime: Number,
        availabilityrate: Number,
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
        good: Number,
        performancerate:Number,
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
        good: Number,
        defect: Number,
        processed: Number,
        qualityrate: Number,
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
        tanggal: String,
        operationtime: Number,
        downtime: Number,
        runningtime: Number,
        cycletime: Number,
        good: Number,
        defect: Number,
        processed: Number,
        availability: Number,
        quality:Number,
        performance:Number,
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