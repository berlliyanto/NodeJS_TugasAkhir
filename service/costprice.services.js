const {price} = require('../models/costprice.model');
const {cost} = require('../models/costprice.model');

//INSERT DATA TIPE
async function insertPrice(params, callback){
    const priceModel = new price(params);
    priceModel
    .save()
    .then((result)=>{
        if(!result) callback("Gagal");
        return callback(null,result);
    })
    .catch((error)=>{
        return callback(error);
    })
}

//GET DATA PRICE LIST
async function getPricelist(params,callback){
    price.find().then((result)=>{
        if(!result) callback("Gagal");
        return callback(null,result);
    })
    .catch((error)=>{
        callback(error);
    })
}

module.exports = {
    insertPrice,
    getPricelist,
}