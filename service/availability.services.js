const { availability } = require("../models/oee.model");
const fetch = require('node-fetch');

//ALAMAT STATUS
const addressStatM1 = 'https://aplikasi-pms-berli.onrender.com/api/getStatusM1'
const addressStatM2 = 'https://aplikasi-pms-berli.onrender.com/api/getStatusM2'
const addressStatM3 = 'https://aplikasi-pms-berli.onrender.com/api/getStatusM3'
const addressStatM4 = 'https://aplikasi-pms-berli.onrender.com/api/getStatusM4'

//ALAMAT PARAMETER
const addressParamM1 = 'https://aplikasi-pms-berli.onrender.com/api/latestParamM1'
const addressParamM2 = 'https://aplikasi-pms-berli.onrender.com/api/latestParamM2'
const addressParamM3 = 'https://aplikasi-pms-berli.onrender.com/api/latestParamM3'
const addressParamM4 = 'https://aplikasi-pms-berli.onrender.com/api/latestParamM4'

//ALAMAT AVAILABILITY
const addressAvaiM1 = 'https://aplikasi-pms-berli.onrender.com/api/latestAvailability?machine_id=1'
const addressAvaiM2 = 'https://aplikasi-pms-berli.onrender.com/api/latestAvailability?machine_id=2'
const addressAvaiM3 = 'https://aplikasi-pms-berli.onrender.com/api/latestAvailability?machine_id=3'
const addressAvaiM4 = 'https://aplikasi-pms-berli.onrender.com/api/latestAvailability?machine_id=4'

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


//TIMER FETCH STATUS
setInterval(fetchS1, 500);
setInterval(fetchS2, 500);
setInterval(fetchS3, 500);
setInterval(fetchS4, 500);

//TIMER FETCH PARAMETER
setInterval(fetchM1, 500);
setInterval(fetchM2, 500);
setInterval(fetchM3, 500);
setInterval(fetchM4, 500);

//TIMER FETCH AVAILABLITY
setInterval(fetchA1, 500);
setInterval(fetchA2, 500);
setInterval(fetchA3, 500);
setInterval(fetchA4, 500);

//TIMER QUERY OPERATION TIME
setTimeout(() => {
    setInterval(OpTimeM1, 1000);
    setInterval(OpTimeM2, 1000);
    setInterval(OpTimeM3, 1000);
    setInterval(OpTimeM4, 1000);
}, 2000);

//FETCH AVAILABILITY
function fetchA1() {
    fetch(addressAvaiM1).then((result) => result.json()).then(({ data }) => {
        stateAM1 = data[0].state
    })
}
function fetchA2() {
    fetch(addressAvaiM2).then((result) => result.json()).then(({ data }) => {
        stateAM2 = data[0].state
    })
}
function fetchA3() {
    fetch(addressAvaiM3).then((result) => result.json()).then(({ data }) => {
        stateAM3 = data[0].state
    })
}
function fetchA4() {
    fetch(addressAvaiM4).then((result) => result.json()).then(({ data }) => {
        stateAM4 = data[0].state
    })
}

//FETCH STATUS
function fetchS1() {
    fetch(addressStatM1).then((result) => result.json()).then(({ data }) => {
        statusM1 = data[0].status;
    });
}
function fetchS2() {
    fetch(addressStatM2).then((result) => result.json()).then(({ data }) => {
        statusM2 = data[0].status;
    });
}
function fetchS3() {
    fetch(addressStatM3).then((result) => result.json()).then(({ data }) => {
        statusM3 = data[0].status;
    });
}
function fetchS4() {
    fetch(addressStatM4).then((result) => result.json()).then(({ data }) => {
        statusM4 = data[0].status;
    });
}

//FETCH PARAMETER
function fetchM1() {
    fetch(addressParamM1).then((result) => result.json()).then(({ data }) => {
        loadingM1 = data[0].loading_time;
        statePM1 = data[0].state;
    });
}
function fetchM2() {
    fetch(addressParamM2).then((result) => result.json()).then(({ data }) => {
        loadingM2 = data[0].loading_time;
        statePM2 = data[0].state;
    });
}
function fetchM3() {
    fetch(addressParamM3).then((result) => result.json()).then(({ data }) => {
        loadingM3 = data[0].loading_time;
        statePM3 = data[0].state;
    });
}
function fetchM4() {
    fetch(addressParamM4).then((result) => result.json()).then(({ data }) => {
        loadingM4 = data[0].loading_time;
        statePM4 = data[0].state;
    });
}
//QUERY
//-------------------------------OPERATION TIME--------------------------------//
//--------------------------------MESIN 1----------------------------------//
function OpTimeM1() {
    if (stateAM1 == 1) {
        if (statePM1 == 1) {
            if (Time1 < (loadingM1 * 60)) {
                Time1++;
                if (statusM1 == 1) {
                    availability.updateOne({
                        $and: [
                            { machine_id: 1 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                operationtime: 1 //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => {
                        console.log(Time1);
                    })
                } else {
                    return null;
                }
            } else {
                availability.updateMany({ machine_id: 1 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    return null;
                })
            }
        } else {
            return null;
        }
    } else {
        Time1 = 0;
        return null;
    }
}
//--------------------------------MESIN 2----------------------------------//
function OpTimeM2() {
    if (stateAM2 == 1) {
        if (statePM2 == 1) {
            if (Time2 < (loadingM2 * 60)) {
                Time2++;
                if (statusM2 == 1) {
                    availability.updateOne({
                        $and: [
                            { machine_id: 2 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                operationtime: 1 //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => {
                    })
                } else {
                    return null;
                }
            } else {
                availability.updateMany({ machine_id: 2 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    return null;
                })
            }
        } else {
            return null;
        }
    } else {
        Time2 = 0;
        return null;
    }
}
//--------------------------------MESIN 3----------------------------------//
function OpTimeM3() {
    if (stateAM3 == 1) {
        if (statePM3 == 1) {
            if (Time3 < (loadingM3 * 60)) {
                Time3++;
                if (statusM3 == 1) {
                    availability.updateOne({
                        $and: [
                            { machine_id: 3 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                operationtime: 1 //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => {
                    })
                } else {
                    return null;
                }
            } else {
                availability.updateMany({ machine_id: 3 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    return null;
                })
            }
        } else {
            return null;
        }
    } else {
        Time3 = 0;
        return null;
    }
}
//--------------------------------MESIN 4----------------------------------//
function OpTimeM4() {
    if (stateAM4 == 1) {
        if (statePM4 == 1) {
            if (Time4 < (loadingM4 * 60)) {
                Time4++;
                if (statusM4 == 1) {
                    availability.updateOne({
                        $and: [
                            { machine_id: 4 }, { state: 1 }
                        ]
                    },
                        {
                            $inc: {
                                operationtime: 1 //Second
                            }
                        }
                    ).sort({ _id: -1 }).then(() => {
                    })
                } else {
                    return null;
                }
            } else {
                availability.updateMany({ machine_id: 4 }, {
                    $set: {
                        state: 0
                    }
                }).sort({ _id: -1 }).then(() => {
                    return null;
                })
            }
        } else {
            return null;
        }
    } else {
        Time4 = 0;
        return null;
    }
}
//-------------------------------OPERATION TIME END--------------------------------//

//-------------------------------DOWNTIME--------------------------------//

//-------------------------------DOWNTIME--------------------------------//

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

module.exports = {
    trigAvailability,
    getAvaiLatest,
}