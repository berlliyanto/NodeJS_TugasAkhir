const { stock } = require("../models/stock.model");

// CREATE DATA
async function createstock(params, callback) {
    if (!params) {
        return callback({
            message: "stock Required",
        }),
            ""
    };

    const stockModel = stock(params);
    stockModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

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

//Tambah Jumlah Bahan Mesin 1
async function stockAddM1(params,callback){
    stock.findOneAndUpdate({machine_id: 1},{
        $inc: {
            A: params.A,
            B: params.B,
            C: params.C
        }
    }).then((response) => {
        if (!response) callback("Gagal Input");
        else return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

module.exports = {
    createstock,
    getstock,
    deletestock,
    stock1,
    stock2,
    stockAddM1,
};