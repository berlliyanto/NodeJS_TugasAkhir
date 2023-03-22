const { response } = require("express");
const { riwayatstock } = require("../models/stock.model");
const { stock } = require("../models/stock.model");

//READ DATA
async function getstock(params, callback) {
    const stockName = params.stockName;
    var condition = stockName
        ? {
            stockName: { $regex: new RegExp(stockName), $option: "i" },
        }
        : {};
    stock
        .find(condition)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//DELETE DATA
async function deletestock(params, callback) {
    const stockId = params.stockId;
    stock
        .findByIdAndRemove(stockId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Stock ID invalid");
            else return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//READ DATA Mesin 1
async function stock1(params,callback) {
    stock.find({ machine_id: 1 }).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ DATA Mesin 2
async function stock2(params,callback) {
    stock.find({ machine_id: 2 }).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//Tambah Jumlah Bahan Mesin 
async function stockAdd(params,callback){
    var machine_id = params.m_id;
    stock.updateOne({machine_id: Number(machine_id)},{
        $inc: {
            A: params.A,
            B: params.B,
            C: params.C
        },
    }).then((response) => {
        if (!response) callback("Gagal Input");
        else return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

//Kurangi Jumlah Bahan Mesin 
async function kurangiStock(params, callback){
    var machine_id = params.m_id
    if(params.A==1){
        stock.updateOne({machine_id:Number(machine_id)},{
            $inc:{
                A: -(params.A)
            }
        }).then((response)=>{
            if(!response) callback("Gagal Kurangi");
            else return callback(null, response);
        }).catch((error)=>{
            return callback(error);
        })
    }else if(params.B==1){
        stock.updateOne({machine_id:Number(machine_id)},{
            $inc:{
                B: -(params.B)
            }
        }).then((response)=>{
            if(!response) callback("Gagal Kurangi");
            else return callback(null, response);
        }).catch((error)=>{
            return callback(error);
        })
    }else if(params.C==1){
        stock.updateOne({machine_id:Number(machine_id)},{
            $inc:{
                C: -(params.C)
            }
        }).then((response)=>{
            if(!response) callback("Gagal Kurangi");
            else return callback(null, response);
        }).catch((error)=>{
            return callback(error);
        })
    }
    
}

//-----------------------------RIWAYAT----------------------------------------//

// CREATE DATA
async function riwayatStock(params, callback) {
    if (!params) {
        return callback({
            message: "stock Required",
        }),
            ""
    };

    const stockModel = riwayatstock(params);
    stockModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//READ HISTORY MESIN 1
async function historyM1 (params, callback){
    riwayatstock.find({machine_id:1}).sort({_id: -1}).limit(30).then(response=>{
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}

module.exports = {
    riwayatStock,
    getstock,
    deletestock,
    stock1,
    stock2,
    stockAdd,
    kurangiStock,
    historyM1,
};