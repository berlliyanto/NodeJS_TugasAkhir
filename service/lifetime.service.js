const {lifetime} = require('../models/lifetime.model');


//-----------------------------------LIFE TIME-------------------------------------//
async function LTM1(){
    await lifetime.updateOne({machine_id:1},{$inc:{
        timevalue: -1
    }});
}
async function LTM2(){
    await lifetime.updateOne({machine_id:2},{$inc:{
        timevalue: -1
    }});
}
async function LTM3(){
    await lifetime.updateOne({machine_id:3},{$inc:{
        timevalue: -1
    }});
}
async function LTM4(){
    await lifetime.updateOne({machine_id:4},{$inc:{
        timevalue: -1
    }});
}


//---------------------------------LIFE TIME END-----------------------------------//

//---------------------------------API----------------------------------------//

//Trigger Lifetime Mesin 
async function trigLifetime(params, callback) {
    if (!params) {
        return callback("param required");
    }
    const avaiModel = new lifetime(params);
    avaiModel.save().then((result) => {
        if (!result) callback("Gagal");
        return callback(null, result);
    }).catch((error) => {
        return callback(error);
    })
}

//Get ALL Lifetime
async function getLifetime(params,callback){
    lifetime.find().then((response)=>{
        if (!response) callback("Gagal");
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

//Get ONE Lifetime
async function getOneLT(params,callback){
    var m_id = params.machine_id
    lifetime.findOne({machine_id: m_id}).then((response)=>{
        if (!response) callback("Gagal");
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

module.exports = {
    getLifetime,
    getOneLT,
    trigLifetime,
}
