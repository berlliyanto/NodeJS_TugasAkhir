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

const riwayatstock = mongoose.model(
    "riwayatstock",
    mongoose.Schema({
        machine_id: Number,
        tipe: String,
        jumlah: Number,
        dibuat: String
    },
    {
        timestamps: true
    }
    )
);

module.exports = {
    stock,
    riwayatstock
}