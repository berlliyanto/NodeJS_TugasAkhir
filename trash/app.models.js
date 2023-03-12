
// TIDAK DI PAKAI..........................

const mongoose = require("mongoose");

const product = mongoose.model(
    "products",
    mongoose.Schema({
        productName: String,
        productDescription: String,
        productPrice: Number,
        productImage: String,
    },
    {
        timestamps: true,
    }
    )
);
//DAFTAR USER
// const user_list = mongoose.model(
//     "users",
//     mongoose.Schema({
//         username: String,
//         password: String,
//         name: String,
//         otoritas: String,
//         noHp: String,
//     }
//     )
// );

module.exports = {
    product,
    // user_list
};