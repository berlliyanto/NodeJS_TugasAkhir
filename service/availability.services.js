const { availability } = require("../models/oee.model");
const { parameter } = require("../models/param.model");
const { status } = require("../models/status.model");

//STATE AVAILABILITY
var stateAM1;
var stateAM2;
var stateAM3;
var stateAM4;

//STATUS MESIN
var statusM1;
var statusM2;
var statusM3;
var statusM4;

//LOADING TIME DARI PARAMETER
var loadingM1;
var loadingM2;
var loadingM3;
var loadingM4;

//STATE PARAMETER
var statePM1;
var statePM2;
var statePM3;
var statePM4;

//TIMER INC +1
let Time1 = 0;
let Time2 = 0;
let Time3 = 0;
let Time4 = 0;

//TIMER Operation Time INC +1
let TimeO1 = 0;
let TimeO2 = 0;
let TimeO3 = 0;
let TimeO4 = 0;

//TIMER Down Time +1
let TimeD1 = 0;
let TimeD2 = 0;
let TimeD3 = 0;
let TimeD4 = 0;

//TIMER FETCH AVAILABLITY
let intervalA1 = setInterval(fetchA1, 1000);
let intervalA2 = setInterval(fetchA2, 1000);
let intervalA3 = setInterval(fetchA3, 1000);
let intervalA4 = setInterval(fetchA4, 1000);

//TIMER FETCH STATUS
let intervalS1 = setInterval(fetchS1, 1000);
let intervalS2 = setInterval(fetchS2, 1000);
let intervalS3 = setInterval(fetchS3, 1000);
let intervalS4 = setInterval(fetchS4, 1000);

//TIMER FETCH PARAMETER
let intervalP1 = setInterval(fetchP1, 1000);
let intervalP2 = setInterval(fetchP2, 1000);
let intervalP3 = setInterval(fetchP3, 1000);
let intervalP4 = setInterval(fetchP4, 1000);

//TIMER QUERY OPERATION TIME

let intervalOP1 = setInterval(OpTimeM1, 1000);
let intervalOP2 = setInterval(OpTimeM2, 1000);
let intervalOP3 = setInterval(OpTimeM3, 1000);
let intervalOP4 = setInterval(OpTimeM4, 1000);


//CLEAR INTERVAL
setTimeout(function() {
    clearInterval(intervalA1);
    clearInterval(intervalA2);
    clearInterval(intervalA3);
    clearInterval(intervalS4);
    clearInterval(intervalS1);
    clearInterval(intervalS2);
    clearInterval(intervalS3);
    clearInterval(intervalS4);
    clearInterval(intervalP1);
    clearInterval(intervalP2);
    clearInterval(intervalP3);
    clearInterval(intervalP4);
    clearInterval(intervalOP1);
    clearInterval(intervalOP2);
    clearInterval(intervalOP3);
    clearInterval(intervalOP4);
    console.log("clear")
}, 100000);

//FETCH AVAILABILITY
async function fetchA1() {
    const fetchAM1 = await availability.findOne({ machine_id: 1 }).sort({ _id: -1 });
    stateAM1 = fetchAM1.state;
    TimeO1 = fetchAM1.operationtime;
    TimeD1 = fetchAM1.downtime;
}
async function fetchA2() {
    const fetchAM2 = await availability.findOne({ machine_id: 2 }).sort({ _id: -1 });
    stateAM2 = fetchAM2.state;
    TimeO2 = fetchAM2.operationtime;
    TimeD2 = fetchAM2.downtime;
}
async function fetchA3() {
    const fetchAM3 = await availability.findOne({ machine_id: 3 }).sort({ _id: -1 });
    stateAM3 = fetchAM3.state;
    TimeO3 = fetchAM3.operationtime;
    TimeD3 = fetchAM3.downtime;
}
async function fetchA4() {
    const fetchAM4 = await availability.findOne({ machine_id: 4 }).sort({ _id: -1 });
    stateAM4 = fetchAM4.state;
    TimeO4 = fetchAM4.operationtime;
    TimeD4 = fetchAM4.downtime;
}

//FETCH STATUS
async function fetchS1() {
    const fetchSM1 = await status.findOne({ machine_id: 1 }).sort({ _id: -1 });
    statusM1 = fetchSM1.status;
}
async function fetchS2() {
    const fetchSM2 = await status.findOne({ machine_id: 2 }).sort({ _id: -1 });
    statusM2 = fetchSM2.status;
}
async function fetchS3() {
    const fetchSM3 = await status.findOne({ machine_id: 3 }).sort({ _id: -1 });
    statusM3 = fetchSM3.status;
}
async function fetchS4() {
    const fetchSM4 = await status.findOne({ machine_id: 4 }).sort({ _id: -1 });
    statusM4 = fetchSM4.status;
}

//FETCH PARAMETER
async function fetchP1() {
    const fetchPM1 = await parameter.findOne({ machine_id: 1 }).sort({ _id: -1 });
    loadingM1 = fetchPM1.loading_time;
    statePM1 = fetchPM1.state;
}
async function fetchP2() {
    const fetchPM2 = await parameter.findOne({ machine_id: 2 }).sort({ _id: -1 });
    loadingM2 = fetchPM2.loading_time;
    statePM2 = fetchPM2.state;
}
async function fetchP3() {
    const fetchPM3 = await parameter.findOne({ machine_id: 3 }).sort({ _id: -1 });
    loadingM3 = fetchPM3.loading_time;
    statePM3 = fetchPM3.state;
}
async function fetchP4() {
    const fetchPM4 = await parameter.findOne({ machine_id: 4 }).sort({ _id: -1 });
    loadingM4 = fetchPM4.loading_time;
    statePM4 = fetchPM4.state;
}
//QUERY
//-------------------------------OPERATION TIME--------------------------------//
//--------------------------------MESIN 1----------------------------------//
async function OpTimeM1() {
    if (stateAM1 == 1) {
        if (statePM1 == 1) {
            if (Time1 < (loadingM1 * 60)) {
                Time1++;
                if (statusM1 == 1) {
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 1 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                operationtime: 1 //Second
                            },
                        },{
                            new:true
                        }
                    ).sort({ _id: -1 }).then(() => {
                        console.log(Time1)
                    });
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    //return null;
                    await availability.updateOne({
                        $and: [
                            { machine_id: 1 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                downtime: 1, //Second
                            },
                        }
                    ).sort({ _id: -1 }).then(() => { });
                }
            } else {
                await availability.updateMany({ machine_id: 1 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    console.log("MESIN 1 SELESAI");
                });
            }
        } else {
            return null;
        }
        if (TimeO1 > 0) {
            await availability.updateOne({
                $and: [
                    { machine_id: 1 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO1 - TimeD1) / TimeO1
                }
            }
            )
        }
    } else {
        Time1 = 0;
    }

}
//--------------------------------MESIN 2----------------------------------//
async function OpTimeM2() {
    if (stateAM2 == 1) {
        if (statePM2 == 1) {
            if (Time2 < (loadingM2 * 60)) {
                Time2++;
                if (statusM2 == 1) {
                    await availability.updateOne({
                        $and: [
                            { machine_id: 2 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                operationtime: 1 //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => { })
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    await availability.updateOne({
                        $and: [
                            { machine_id: 2 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                downtime: 1, //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => { });
                }
            } else {
                await availability.updateMany({ machine_id: 2 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    console.log("MESIN 2 SELESAI");
                })
            }
        } else {
            return null;
        }
        if (TimeO2 > 0) {
            await availability.updateOne({
                $and: [
                    { machine_id: 1 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO1 - TimeD1) / TimeO1
                }
            }
            )
        }
    } else {
        Time2 = 0;
        return null;
    }
}
//--------------------------------MESIN 3----------------------------------//
async function OpTimeM3() {
    if (stateAM3 == 1) {
        if (statePM3 == 1) {
            if (Time3 < (loadingM3 * 60)) {
                Time3++;
                if (statusM3 == 1) {
                    await availability.updateOne({
                        $and: [
                            { machine_id: 3 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                operationtime: 1 //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => { });
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    await availability.updateOne({
                        $and: [
                            { machine_id: 3 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                downtime: 1, //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => { });
                }
            } else {
                await availability.updateMany({ machine_id: 3 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    console.log("MESIN 3 SELESAI");
                })
            }
        } else {
            return null;
        }
        if (TimeO3 > 0) {
            await availability.updateOne({
                $and: [
                    { machine_id: 1 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO1 - TimeD1) / TimeO1
                }
            }
            )
        }
    } else {
        Time3 = 0;
        return null;
    }
}
//--------------------------------MESIN 4----------------------------------//
async function OpTimeM4() {
    if (stateAM4 == 1) {
        if (statePM4 == 1) {
            if (Time4 < (loadingM4 * 60)) {
                Time4++;
                if (statusM4 == 1) {
                    await availability.updateOne({
                        $and: [
                            { machine_id: 4 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                operationtime: 1 //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => { })
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    await availability.updateOne({
                        $and: [
                            { machine_id: 4 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                runningtime: 1, //Second
                                downtime: 1, //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => { });
                }
            } else {
                await availability.updateMany({ machine_id: 4 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    console.log("MESIN 4 SELESAI");
                })
            }
        } else {
            return null;
        }
        if (TimeO4 > 0) {
            await availability.updateOne({
                $and: [
                    { machine_id: 1 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO1 - TimeD1) / TimeO1
                }
            }
            )
        }
    } else {
        Time4 = 0;
        return null;
    }
}
//-------------------------------OPERATION TIME END--------------------------------//


//---------------------------------API----------------------------------------//

//Trigger Availability Mesin 
async function trigAvailability(params, callback) {
    if (!params) {
        return callback("param required");
    }
    const avaiModel = new availability(params);
    avaiModel.save().then((result) => {
        if (!result) callback("Gagal");
        return callback(null, result);
    }).catch((error) => {
        return callback(error);
    })
}

//Get Availability Terbaru
async function getAvaiLatest(params, callback) {
    var m_id = params.machine_id;
    availability.find({ machine_id: m_id }).sort({ _id: -1 }).limit(1).then((response) => {
        if (!response) callback("Gagal");
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

//Reset Availability
async function resetAvailability(params, callback) {
    var m_id = params.machine_id
    availability.updateMany({ machine_id: m_id }, {
        $set: {
            state: 0
        }
    }).then((response) => {
        if (!response) callback("Gagal");
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

module.exports = {
    trigAvailability,
    getAvaiLatest,
    resetAvailability,
}