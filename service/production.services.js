const { production } = require("../models/production.model");

// INPUT PROCESSED MESIN 1
async function inputProcessed(params, callback) {
    if (!params) {
        return callback({
            message: "Product Name Required",
        }),
            ""
    };
    const productModel = production(params);
    productModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//GET PROCESSED ALL MACHINE USE QUERY
async function getProcessed(params, callback) {
    var m_id = params.machine_id;
    var status = params.status;
    var state = params.state;
    var tipe = params.tipe;
    production.aggregate([
        {
            $match: {
                $and:[
                    {machine_id:Number(m_id)},{state:Number(state)},{status:Number(status)},{tipeBenda:tipe}
                ],
                
            }
        },
        {
            $count: "processed"
        },

    ]).then((response) => {
        return callback(null, response);       
    }).catch((error) => {
        return callback(error);
    })
}

// RESET PROCESSED
async function resetProcess(params, callback){
    var m_id = params.m_id
    production.updateMany({machine_id:Number(m_id)},{
        state: params.state
    }).then((response)=>{
        if(!response) callback("gagal");
        return callback(null,response);
    }).catch((error)=>{
        callback(error);
    })

}

async function deleteData(callback){
    production.deleteMany().then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        callback(error);
    })
}
module.exports = {
    inputProcessed,
    resetProcess,
    getProcessed,
    deleteData
};