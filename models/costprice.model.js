const mongoose = require('mongoose');

const cost = mongoose.model(
    'cost',
    mongoose.Schema({
        machine_id: Number,
        tanggal: String,
        tipe: String,
        processed: Number,
        harga_unit: Number,
        total_harga: Number,
        state: Number,
    },
        {
            timestamps: true,
        }
    )
)

const price = mongoose.model(
    'price',
    mongoose.Schema({
        tipe: String,
        name_baku1: String,
        name_baku2: String,
        name_baku3: String,
        price_baku1: Number,
        price_baku2: Number,
        price_baku3: Number,
        price_total: Number,
    },
    )
)

module.exports = {
    cost,
    price
}