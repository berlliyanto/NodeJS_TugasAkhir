const { response } = require('express');
const { pressure } = require('../models/pressure.model');

//INSERT PRESSURE
async function inputPressure(params, callback) {
    if (!params) {
        return callback({
            message: "Pressure Required",
        }),
            ""
    };
    const pressModel = pressure(params);
    pressModel.save().then((response => {
        return callback(null, response);
    })).catch((error) => {
        return callback(error);
    })
}

//GET PRESSURE FOR GAUGES
async function pressureGauges(callback){
    pressure.find().sort({_id: -1}).limit(1)
    .then((response)=>{
        if(!response) callback ("No Data");
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
}

//GET PRESSURE FOR CHART
async function pressureChart(callback){
    pressure.find().sort({_id: -1}).limit(6)
    .then((response)=>{
        if(!response) callback ("No Data");
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}

// DELETE ALL
async function deletePressure(params,callback){
    pressure.deleteMany()
    .then((response)=>{
        if(!response) callback("gagal");
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })
}

module.exports ={
    inputPressure,
    pressureGauges,
    pressureChart,
    deletePressure
}