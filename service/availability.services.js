const { availability } = require("../models/oee.model");
const { parameter } = require("../models/param.model");
const { status } = require("../models/status.model");
const { lifetime } = require("../models/lifetime.model");
const { notifikasi } = require("../models/notifikasi.model");


const chat_ID = '-1001984270471';
const { TOKEN_TELEGRAM_BOT } = require("../config/app.config");
const { Telegraf } = require('telegraf');
const { preventive } = require("../models/preventive.model");
const bot = new Telegraf(process.env.TELEBOT_TOKEN);

//FUNCTION KIRIM PESAN
async function sendTelegramMessage(chatId, message) {
    try {
      await bot.telegram.sendMessage(chatId, message);
      console.log(`Message sent to ${chatId}: ${message}`);
    } catch (err) {
      console.error(`Error sending message to ${chatId}: ${err.message}`);
    }
}  

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

//TIMER Operation Time Fetch
let TimeO1 = 0;
let TimeO2 = 0;
let TimeO3 = 0;
let TimeO4 = 0;

//TIMER Down Time Fetch
let TimeD1 = 0;
let TimeD2 = 0;
let TimeD3 = 0;
let TimeD4 = 0;

//TIMER OP TIME +1
let TimeplusO1 = 0;
let TimeplusO2 = 0;
let TimeplusO3 = 0;
let TimeplusO4 = 0;

//TIMER DT TIME +1
let TimeplusD1 = 0;
let TimeplusD2 = 0;
let TimeplusD3 = 0;
let TimeplusD4 = 0;

//TIME DI NOTIFIKASI
// let timeNotifM1;
// let timeNotifM2;
// let timeNotifM3;
// let timeNotifM4;

//STOPPER
// let isMessage1 = false;
// let isMessage2 = false;
// let isMessage3 = false;
// let isMessage4 = false;

//TIMER QUERY OPERATION TIME
function runAllFunctions() {
    fetchA1();
    fetchA2();
    fetchA3();
    fetchA4();
    fetchS1();
    fetchS2();
    fetchS3();
    fetchS4();
    fetchP1();
    fetchP2();
    fetchP3();
    fetchP4();
    OpTimeM1();
    OpTimeM2();
    OpTimeM3();
    OpTimeM4();
    // fetchNotifikasi();
}

setInterval(runAllFunctions, 1000);

//FETCH NOTIFIKASI
// async function fetchNotifikasi() {
//     const fetchNotifikasi1 = await notifikasi.findOne({ machine_id: 1 }).sort({ _id: -1 });
//     const fetchNotifikasi2 = await notifikasi.findOne({ machine_id: 2 }).sort({ _id: -1 });
//     const fetchNotifikasi3 = await notifikasi.findOne({ machine_id: 3 }).sort({ _id: -1 });
//     const fetchNotifikasi4 = await notifikasi.findOne({ machine_id: 4 }).sort({ _id: -1 });

//     timeNotifM1 = fetchNotifikasi1.time;
//     timeNotifM2 = fetchNotifikasi2.time;
//     timeNotifM3 = fetchNotifikasi3.time;
//     timeNotifM4 = fetchNotifikasi4.time;
    
// }

//FETCH AVAILABILITY
async function fetchA1() {
    const fetchAM1 = await availability.findOne({ machine_id: 1 }).sort({ _id: -1 });
    stateAM1 = fetchAM1.state;
    TimeO1 = fetchAM1.runningtime;
    TimeD1 = fetchAM1.downtime;
}
async function fetchA2() {
    const fetchAM2 = await availability.findOne({ machine_id: 2 }).sort({ _id: -1 });
    stateAM2 = fetchAM2.state;
    TimeO2 = fetchAM2.runningtime;
    TimeD2 = fetchAM2.downtime;
}
async function fetchA3() {
    const fetchAM3 = await availability.findOne({ machine_id: 3 }).sort({ _id: -1 });
    stateAM3 = fetchAM3.state;
    TimeO3 = fetchAM3.runningtime;
    TimeD3 = fetchAM3.downtime;
}
async function fetchA4() {
    const fetchAM4 = await availability.findOne({ machine_id: 4 }).sort({ _id: -1 });
    stateAM4 = fetchAM4.state;
    TimeO4 = fetchAM4.runningtime;
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
                    TimeplusO1 = TimeplusO1 + 1;
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 1 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time1, //Second
                                operationtime: TimeplusO1 //Second
                            },
                        }, {
                        new: true
                    }
                    ).sort({ _id: -1 });
                    lifetime.updateOne({ machine_id: 1 }, {
                        $inc: {
                            timevalue: -1
                        }
                    }).then(() => { });
                    //NOTIFIKASI PER 5 MENIT BUAT MODEL PENGUJIAN PREVENTIVE SAAT SIDANG
                    // if (timeNotifM1 > 299) {
                    //     notifikasi.bulkWrite(
                    //         [   {
                    //             updateMany:{
                    //                 filter:{
                    //                     $and:[
                    //                         {machine_id:1},{trigger:true}
                    //                     ]
                    //                 },
                    //                 update:{
                    //                     trigger: false
                    //                 }
                    //             }
                    //         },
                    //             {
                    //                 insertOne:{
                    //                     document:{
                    //                         machine_id: 1,
                    //                         time: 0,
                    //                         trigger: true
                    //                     }
                    //                 }
                    //             }
                    //         ]
                    //     ).then(()=>{});
                    //     await sendTelegramMessage(chat_ID,`**WARNING**\nMesin 1 Sudah Beroperasi Selama ${(timeNotifM1/60).toFixed(1)} Menit, Harap Segera Lakukan Perbaikan`);
                    //     isMessage1 = true;
                    // } else {
                    //     notifikasi.findOneAndUpdate(
                    //         { $and: [{ machine_id: 1 }, { trigger: true }] },
                    //         {
                    //             $inc: {
                    //                 time: 1
                    //             }
                    //         }
                    //     ).then(()=>{});
                    // }
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    //return null;
                    TimeplusD1 = TimeplusD1 + 1;
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 1 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time1, //Second
                                downtime: TimeplusD1, //Second
                            },
                        }, {
                        new: true
                    }
                    ).sort({ _id: -1 });
                }
            } else {
                TimeplusD1 = 0;
                TimeplusO1 = 0;
                await availability.updateMany({ machine_id: 1 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 });
                await sendTelegramMessage(chat_ID,'**INFO**\nMesin 1 Selesai Beroperasi!');
                console.log("MESIN 1 SELESAI");
                isMessage1 = true;
            }
        } else {
            isMessage1 = false;
            TimeplusD1 = 0;
            TimeplusO1 = 0;
            return null;
        }
        if (TimeO1 > 0) {
            await availability.findOneAndUpdate({
                $and: [
                    { machine_id: 1 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO1 - TimeD1) / TimeO1
                },
            }
            )
        }
    } else {
        isMessage1 = false;
        TimeplusD1 = 0;
        TimeplusO1 = 0;
        Time1 = 0;
    }

}
//
//--------------------------------MESIN 2----------------------------------//
async function OpTimeM2() {
    if (stateAM2 == 1) {
        if (statePM2 == 1) {
            if (Time2 < (loadingM2 * 60)) {
                Time2++;
                if (statusM2 == 1) {
                    TimeplusO2++
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 2 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time2, //Second
                                operationtime: TimeplusO2 //Second
                            },
                        }, {
                        new: true
                    }
                    ).sort({ _id: -1 });
                    lifetime.updateOne({ machine_id: 2 }, {
                        $inc: {
                            timevalue: -1
                        }
                    }).then(() => { });
                    //NOTIFIKASI PER 5 MENIT BUAT MODEL PENGUJIAN PREVENTIVE SAAT SIDANG
                    // if (timeNotifM2 > 299) {
                    //     notifikasi.bulkWrite(
                    //         [   {
                    //             updateMany:{
                    //                 filter:{
                    //                     $and:[
                    //                         {machine_id:2},{trigger:true}
                    //                     ]
                    //                 },
                    //                 update:{
                    //                     trigger: false
                    //                 }
                    //             }
                    //         },
                    //             {
                    //                 insertOne:{
                    //                     document:{
                    //                         machine_id: 2,
                    //                         time: 0,
                    //                         trigger: true
                    //                     }
                    //                 }
                    //             }
                    //         ]
                    //     ).then(()=>{});
                    //     await sendTelegramMessage(chat_ID,`**WARNING**\nMesin 2 Sudah Beroperasi Selama ${(timeNotifM2/60).toFixed(1)} Menit, Harap Segera Lakukan Perbaikan`);
                    //     isMessage2 = true;
                    // } else {
                    //     notifikasi.findOneAndUpdate(
                    //         { $and: [{ machine_id: 2 }, { trigger: true }] },
                    //         {
                    //             $inc: {
                    //                 time: 1
                    //             }
                    //         }
                    //     ).then(()=>{});
                    // }
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    TimeplusD2++;
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 2 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time2, //Second
                                downtime: TimeplusD2, //Second
                            },
                        }, {
                        new: true
                    }
                    ).sort({ _id: -1 });
                }
            } else {
                TimeplusD2 = 0;
                TimeplusO2 = 0;
                await availability.updateMany({ machine_id: 2 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 });
                await sendTelegramMessage(chat_ID,'**INFO**\nMesin 2 Selesai Beroperasi!');
                console.log("MESIN 2 SELESAI");
                isMessage2 =true;
            }
        } else {
            isMessage2 = false;
            TimeplusD2 = 0;
            TimeplusO2 = 0;
            return null;
        }
        if (TimeO2 > 0) {
            await availability.findOneAndUpdate({
                $and: [
                    { machine_id: 2 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO2 - TimeD2) / TimeO2
                }
            }
            )
        }
    } else {
        isMessage2 = false;
        TimeplusD2 = 0;
        TimeplusO2 = 0;
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
                    TimeplusO3++
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 3 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time3, //Second
                                operationtime: TimeplusO3 //Second
                            },
                        }, {
                        new: true
                    }
                    ).sort({ _id: -1 });
                    lifetime.updateOne({ machine_id: 3 }, {
                        $inc: {
                            timevalue: -1
                        }
                    }).then(() => { });
                    //NOTIFIKASI PER 5 MENIT BUAT MODEL PENGUJIAN PREVENTIVE SAAT SIDANG
                    // if (timeNotifM3 > 299) {
                    //     notifikasi.bulkWrite(
                    //         [   {
                    //             updateMany:{
                    //                 filter:{
                    //                     $and:[
                    //                         {machine_id:3},{trigger:true}
                    //                     ]
                    //                 },
                    //                 update:{
                    //                     trigger: false
                    //                 }
                    //             }
                    //         },
                    //             {
                    //                 insertOne:{
                    //                     document:{
                    //                         machine_id: 3,
                    //                         time: 0,
                    //                         trigger: true
                    //                     }
                    //                 }
                    //             }
                    //         ]
                    //     ).then(()=>{});
                    //     await sendTelegramMessage(chat_ID,`**WARNING**\nMesin 3 Sudah Beroperasi Selama ${(timeNotifM3/60).toFixed(1)} Menit, Harap Segera Lakukan Perbaikan`);
                    //     isMessage3 = true;
                    // } else {
                    //     notifikasi.findOneAndUpdate(
                    //         { $and: [{ machine_id: 3 }, { trigger: true }] },
                    //         {
                    //             $inc: {
                    //                 time: 1
                    //             }
                    //         }
                    //     ).then(()=>{});
                    // }
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    TimeplusD3++;
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 3 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time3, //Second
                                downtime: TimeplusD3, //Second
                            },
                        }, {
                        new: true
                    }
                    ).sort({ _id: -1 });
                }
            } else {
                TimeplusD3 = 0;
                TimeplusO3 = 0;
                await availability.updateMany({ machine_id: 3 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 });
                await sendTelegramMessage(chat_ID,'**INFO**\nMesin 3 Selesai Beroperasi!');
                console.log("MESIN 3 SELESAI");
                isMessage3 = true;
            }
        } else {
            isMessage3 = false;
            TimeplusD3 = 0;
            TimeplusO3 = 0;
            return null;
        }
        if (TimeO3 > 0) {
            await availability.findOneAndUpdate({
                $and: [
                    { machine_id: 3 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO3 - TimeD3) / TimeO3
                }
            }
            )
        }
    } else {
        isMessage3 = false;
        Time3 = 0;
        TimeplusD3 = 0;
        TimeplusO3 = 0;
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
                    TimeplusO4++
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 4 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time4, //Second
                                operationtime: TimeplusO4 //Second
                            },
                        }, {
                        new: true
                    }
                    ).sort({ _id: -1 });
                    lifetime.updateOne({ machine_id: 4 }, {
                        $inc: {
                            timevalue: -1
                        }
                    }).then(() => { });
                    //NOTIFIKASI PER 5 MENIT BUAT MODEL PENGUJIAN PREVENTIVE SAAT SIDANG
                    // if (timeNotifM4 > 299) {
                    //     notifikasi.bulkWrite(
                    //         [   {
                    //             updateMany:{
                    //                 filter:{
                    //                     $and:[
                    //                         {machine_id:4},{trigger:true}
                    //                     ]
                    //                 },
                    //                 update:{
                    //                     trigger: false
                    //                 }
                    //             }
                    //         },
                    //             {
                    //                 insertOne:{
                    //                     document:{
                    //                         machine_id: 4,
                    //                         time: 0,
                    //                         trigger: true
                    //                     }
                    //                 }
                    //             },
                                
                    //         ]
                    //     ).then(()=>{});
                    //     await sendTelegramMessage(chat_ID,`**WARNING**\nMesin 4 Sudah Beroperasi Selama ${(timeNotifM4/60).toFixed(1)} Menit, Harap Segera Lakukan Perbaikan`);
                    //     isMessage4 = true;
                    // } else {
                    //     notifikasi.findOneAndUpdate(
                    //         { $and: [{ machine_id: 4 }, { trigger: true }] },
                    //         {
                    //             $inc: {
                    //                 time: 1
                    //             }
                    //         }
                    //     ).then(()=>{});
                    // }
                } else {
                    //-------------------------------DOWNTIME--------------------------------//
                    TimeplusD4++;
                    await availability.findOneAndUpdate({
                        $and: [
                            { machine_id: 4 }, { state: 1 }
                        ]
                    },
                        {
                            $set: {
                                runningtime: Time4, //Second
                                downtime: TimeplusD4, //Second
                            },
                        }, {
                        new: true,
                    }
                    ).sort({ _id: -1 });
                }
            } else {
                TimeplusD4 = 0;
                TimeplusO4 = 0;
                await availability.updateMany({ machine_id: 4 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 });
                await sendTelegramMessage(chat_ID,'**INFO**\nMesin 1 Selesai Beroperasi!');
                console.log("MESIN 4 SELESAI");
                isMessage4 = true;
            }
        } else {
            isMessage4 = false;
            TimeplusD4 = 0;
            TimeplusO4 = 0;
            return null;
        }
        if (TimeO4 > 0) {
            await availability.findOneAndUpdate({
                $and: [
                    { machine_id: 4 }, { state: 1 }
                ]
            }, {
                $set: {
                    availabilityrate: (TimeO4 - TimeD4) / TimeO4
                }
            }
            )
        }
    } else {
        isMessage4 = false;
        Time4 = 0;
        TimeplusD4 = 0;
        TimeplusO4 = 0;
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