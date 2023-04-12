const { response } = require('express');
const { oee } = require('../models/oee.model');
const { performance } = require('../models/oee.model');
const { availability } = require('../models/oee.model');
const { quality } = require('../models/oee.model');

//VARIABEL QUALITY RATE
let qualityM1;
let qualityM2;
let qualityM3;
let qualityM4;

//VARIABEL PERFORMANCE RATE
let performanceM1;
let performanceM2;
let performanceM3;
let performanceM4;

//VARIABEL AVAILABILITY RATE
let availabilityM1;
let availabilityM2;
let availabilityM3;
let availabilityM4;

//VARIABEL STATE OEE
let stateOEEM1;
let stateOEEM2;
let stateOEEM3;
let stateOEEM4;

function Fetch() {
    FetchQuality();
    FetchAvailability();
    FetchPerformance();
    Fetchoee();
    updateOEE();
}

setInterval(() => {
    Fetch();
}, 1000);

//------------------------FETCH-------------------------//
async function FetchQuality() {
    const fetchQM1 = await quality.findOne({ machine_id: 1 }).sort({ _id: -1 });
    const fetchQM2 = await quality.findOne({ machine_id: 2 }).sort({ _id: -1 });
    const fetchQM3 = await quality.findOne({ machine_id: 3 }).sort({ _id: -1 });
    const fetchQM4 = await quality.findOne({ machine_id: 4 }).sort({ _id: -1 });

    qualityM1 = fetchQM1.qualityrate;
    qualityM2 = fetchQM2.qualityrate;
    qualityM3 = fetchQM3.qualityrate;
    qualityM4 = fetchQM4.qualityrate;
}

async function FetchPerformance() {
    const fetchPM1 = await performance.findOne({ machine_id: 1 }).sort({ _id: -1 });
    const fetchPM2 = await performance.findOne({ machine_id: 2 }).sort({ _id: -1 });
    const fetchPM3 = await performance.findOne({ machine_id: 3 }).sort({ _id: -1 });
    const fetchPM4 = await performance.findOne({ machine_id: 4 }).sort({ _id: -1 });

    performanceM1 = fetchPM1.performancerate;
    performanceM2 = fetchPM2.performancerate;
    performanceM3 = fetchPM3.performancerate;
    performanceM4 = fetchPM4.performancerate;
}

async function FetchAvailability() {
    const fetchAM1 = await availability.findOne({ machine_id: 1 }).sort({ _id: -1 });
    const fetchAM2 = await availability.findOne({ machine_id: 2 }).sort({ _id: -1 });
    const fetchAM3 = await availability.findOne({ machine_id: 3 }).sort({ _id: -1 });
    const fetchAM4 = await availability.findOne({ machine_id: 4 }).sort({ _id: -1 });

    availabilityM1 = fetchAM1.availabilityrate;
    availabilityM2 = fetchAM2.availabilityrate;
    availabilityM3 = fetchAM3.availabilityrate;
    availabilityM4 = fetchAM4.availabilityrate;
}

async function Fetchoee() {
    const fetchOM1 = await oee.findOne({ machine_id: 1 }).sort({ _id: -1 });
    const fetchOM2 = await oee.findOne({ machine_id: 2 }).sort({ _id: -1 });
    const fetchOM3 = await oee.findOne({ machine_id: 3 }).sort({ _id: -1 });
    const fetchOM4 = await oee.findOne({ machine_id: 4 }).sort({ _id: -1 });

    stateOEEM1 = fetchOM1.state;
    stateOEEM2 = fetchOM2.state;
    stateOEEM3 = fetchOM3.state;
    stateOEEM4 = fetchOM4.state;
}
//-------------------------------------QUERY---------------------------------------//
async function updateOEE() {
    //MACHINE 1
    if (stateOEEM1 == 1) {
        if (qualityM1 > 0 && performanceM1 > 0 && availabilityM1 > 0) {
            await oee.findOneAndUpdate({
                $and: [
                    { machine_id: 1 }, { state: 1 }
                ]
            }, {
                $set: {
                    quality: qualityM1,
                    availability: availabilityM1,
                    performance: performanceM1,
                    nilaioee: qualityM1 * availabilityM1 * performanceM1,
                }
            })
        } else {
            return null;
        }
    } else {
        return null;
    }
    //MACHINE 2
    if (stateOEEM2 == 1) {
        if (qualityM2 > 0 && performanceM2 > 0 && availabilityM2 > 0) {
            await oee.findOneAndUpdate({
                $and: [
                    { machine_id: 2 }, { state: 1 }
                ]
            }, {
                $set: {
                    quality: qualityM2,
                    availability: availabilityM2,
                    performance: performanceM2,
                    nilaioee: qualityM2 * availabilityM2 * performanceM2,
                }
            })
        } else {
            return null;
        }
    } else {
        return null;
    }
    //MACHINE 3
    if (stateOEEM3 == 1) {
        if (qualityM3 > 0 && performanceM3 > 0 && availabilityM3 > 0) {
            await oee.findOneAndUpdate({
                $and: [
                    { machine_id: 3 }, { state: 3 }
                ]
            }, {
                $set: {
                    quality: qualityM3,
                    availability: availabilityM3,
                    performance: performanceM3,
                    nilaioee: qualityM3 * availabilityM3 * performanceM3,
                }
            })
        } else {
            return null;
        }
    } else {
        return null;
    }
    //MACHINE 4
    if (stateOEEM4 == 4) {
        if (qualityM4 > 0 && performanceM4 > 0 && availabilityM4 > 0) {
            await oee.findOneAndUpdate({
                $and: [
                    { machine_id: 4 }, { state: 1 }
                ]
            }, {
                $set: {
                    quality: qualityM4,
                    availability: availabilityM4,
                    performance: performanceM4,
                    nilaioee: qualityM4 * availabilityM4 * performanceM4,
                }
            })
        } else {
            return null;
        }
    } else {
        return null;
    }
}

//--------------------------------------API----------------------------------------//
//Trigger OEE
async function createoee(params, callback) {
    if (!params) {
        return callback({
            message: "oee Required",
        }),
            ""
    };
    const OEEmodel = oee(params);
    OEEmodel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//Reset OEE
async function resetOEE(params, callback) {
    var m_id = params.machine_id
    oee.updateMany({ machine_id: m_id }, {
        $set: {
            state: 0
        }
    })
        .then((response) => {
            if (!response) callback("Gagal");
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })
}

//GET OEE RESULT
async function getOEE(params,callback){
    var m_id = params.machine_id;
    oee.find({machine_id:m_id}).sort({_id:-1}).limit(1)
    .then((response)=>{
        if(!response) callback("Gagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    })
}

//GET OEE FOR DASHBOARD
async function dashOEE(machine_id) {
    const latestdata = [];
    for (const id of machine_id) {
        const result = await oee.findOne({ machine_id: id }).sort({ _id: -1 });
        latestdata.push(result);
    }
    return latestdata;
}

//GET OEE HSITORY
async function getOEEHistory(params,callback){
    m_id = params.m_id;
    oee.find({machine_id:m_id}).sort({_id:-1}).limit(30)
    .then((result)=>{
        if(!result) callback("GAGAL");
        return callback(null,result);
    })
    .catch((error)=>{
        return callback(error);
    })
}

module.exports = {
    createoee,
    resetOEE,
    getOEE,
    dashOEE,
    getOEEHistory,
}
