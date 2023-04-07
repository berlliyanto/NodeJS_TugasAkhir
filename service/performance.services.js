
const { performance } = require('../models/oee.model');
const { quality } = require('../models/oee.model')
const { availability } = require('../models/oee.model');
const { parameter } = require('../models/param.model');

//VARIABLE CYCLE TIME MESIN
var cycleM1;
var cycleM2;
var cycleM3;
var cycleM4;

//VARIABLE GOOD PROCESSED MESIN
var processedM1;
var processedM2;
var processedM3;
var processedM4;

//VARIABLE OPERATION TIME MESIN
var OPtimeM1;
var OPtimeM2;
var OPtimeM3;
var OPtimeM4;

//VARIABLE STATE PERFORMANCE MESIN
var statePMCM1;
var statePMCM2;
var statePMCM3;
var statePMCM4;

//VARIABLE STATE PARAMETER MESIN
var statePM1;
var statePM2;
var statePM3;
var statePM4;

function runFetch(){
    //TIMER FETCH PARAMETER
    fetchC1();
    fetchC2();
    fetchC3();
    fetchC4();
    //TIMER FETCH QUALITIY
    fetchG1();
    fetchG2();
    fetchG3();
    fetchG4();
    //TIMER FETCH AVAILABILITY
    fetchO1();
    fetchO2();
    fetchO3();
    fetchO4();
    //TIMER FETCH AVAILABILITY
    fetchSP1();
    fetchSP2();
    fetchSP3();
    fetchSP4();
    //TIMER QUERY
    updatePerformanceM1();
    updatePerformanceM2();
    updatePerformanceM3();
    updatePerformanceM4();
}

setInterval(runFetch,1000);

//-------------------------------------FETCH----------------------------------------//
//-----------------------PARAMETER-------------------------//
//FETCH CYCLE TIME M1
async function fetchC1() {
    const fetchCM1 = await parameter.findOne({ machine_id: 1 }).sort({ _id: -1 });
    cycleM1 = fetchCM1.cycle_time;
    statePM1 = fetchCM1.state;
}
//FETCH CYCLE TIME M2
async function fetchC2() {
    const fetchCM2 = await parameter.findOne({ machine_id: 2 }).sort({ _id: -1 });
    cycleM2 = fetchCM2.cycle_time;
    statePM2 = fetchCM2.state;
}
//FETCH CYCLE TIME M3
async function fetchC3() {
    const fetchCM3 = await parameter.findOne({ machine_id: 3 }).sort({ _id: -1 });
    cycleM3 = fetchCM3.cycle_time;
    statePM3 = fetchCM3.state;
}
//FETCH CYCLE TIME M4
async function fetchC4() {
    const fetchCM4 = await parameter.findOne({ machine_id: 4 }).sort({ _id: -1 });
    cycleM4 = fetchCM4.cycle_time;
    statePM4 = fetchCM4.state;
}

//-----------------------QUALITY-------------------------//
//FETCH PROCESSED M1
async function fetchG1() {
    const fetchGM1 = await quality.findOne({ machine_id: 1 }).sort({ _id: -1 });
    processedM1 = fetchGM1.processed;
}
//FETCH PROCESSED M2
async function fetchG2() {
    const fetchGM2 = await quality.findOne({ machine_id: 2 }).sort({ _id: -1 });
    processedM2 = fetchGM2.processed;
}
//FETCH PROCESSED M3
async function fetchG3() {
    const fetchGM3 = await quality.findOne({ machine_id: 3 }).sort({ _id: -1 });
    processedM3 = fetchGM3.processed;
}
//FETCH PROCESSED M4
async function fetchG4() {
    const fetchGM4 = await quality.findOne({ machine_id: 4 }).sort({ _id: -1 });
    processedM4 = fetchGM4.processed;
}

//-----------------------AVAILABILITY-------------------------//
//FETCH OPERATION TIME M1
async function fetchO1() {
    const fetchOM1 = await availability.findOne({ machine_id: 1 }).sort({ _id: -1 });
    OPtimeM1 = fetchOM1.operationtime;
}
//FETCH OPERATION TIME M2
async function fetchO2() {
    const fetchOM2 = await availability.findOne({ machine_id: 2 }).sort({ _id: -1 });
    OPtimeM2 = fetchOM2.operationtime;
}
//FETCH OPERATION TIME M3
async function fetchO3() {
    const fetchOM3 = await availability.findOne({ machine_id: 3 }).sort({ _id: -1 });
    OPtimeM3 = fetchOM3.operationtime;
}
//FETCH OPERATION TIME M4
async function fetchO4() {
    const fetchOM4 = await availability.findOne({ machine_id: 4 }).sort({ _id: -1 });
    OPtimeM4 = fetchOM4.operationtime;
}

//-----------------------PERFORMANCE-------------------------//
//FETCH OPERATION TIME M1
async function fetchSP1() {
    const fetchSPM1 = await performance.findOne({ machine_id: 1 }).sort({ _id: -1 });
    statePMCM1 = fetchSPM1.state;
}
//FETCH OPERATION TIME M2
async function fetchSP2() {
    const fetchSPM2 = await performance.findOne({ machine_id: 2 }).sort({ _id: -1 });
    statePMCM2 = fetchSPM2.state;
}
//FETCH OPERATION TIME M3
async function fetchSP3() {
    const fetchSPM3 = await performance.findOne({ machine_id: 3 }).sort({ _id: -1 });
    statePMCM3 = fetchSPM3.state;
}
//FETCH OPERATION TIME M4
async function fetchSP4() {
    const fetchSPM4 = await performance.findOne({ machine_id: 4 }).sort({ _id: -1 });
    statePMCM4 = fetchSPM4.state;
}

//------------------------------------------------QUERY-----------------------------------------------//
//------------------------MACHINE 1-------------------------//
async function updatePerformanceM1() {
    if(statePMCM1==1){
        if(processedM1>0&&OPtimeM1>0&&cycleM1>0){
            if (statePM1 == 1) {
                await performance.updateOne(
                    {
                        $and: [
                            { machine_id: 1 }, { state: 1 }
                        ]
                    },
                    {
                        $set: {
                            processed: processedM1,
                            operationtime: OPtimeM1,
                            cycle_time: cycleM1,
                            performancerate: (processedM1*cycleM1)/(OPtimeM1/60)
                        }
                    }
                )
                    .sort({ _id: -1 })
                    .then(() => {
                        return null;
                    })
            } else {
                return null;
            }
        }else{
            return null;
        }
    }else{
        return null;
    }
}
//------------------------MACHINE 2-------------------------//
async function updatePerformanceM2() {
    if(statePMCM2==2){
        if(processedM2>0&&OPtimeM2>0&&cycleM2>0){
            if (statePM2 == 2) {
                await performance.updateOne(
                    {
                        $and: [
                            { machine_id: 2 }, { state: 1 }
                        ]
                    },
                    {
                        $set: {
                            processed: processedM2,
                            operationtime: OPtimeM2,
                            cycle_time: cycleM2,
                            performancerate: (processedM2*cycleM2)/(OPtimeM2/60)
                        }
                    }
                )
                    .sort({ _id: -1 })
                    .then(() => {
                        return null;
                    })
            } else {
                return null;
            }
        }else{
            return null;
        }
    }else{
        return null;
    }
}
//------------------------MACHINE 3-------------------------//
async function updatePerformanceM3() {
    if(statePMCM3==3){
        if(processedM3>0&&OPtimeM3>0&&cycleM3>0){
            if (statePM3 == 3) {
                await performance.updateOne(
                    {
                        $and: [
                            { machine_id: 3 }, { state: 1 }
                        ]
                    },
                    {
                        $set: {
                            processed: processedM3,
                            operationtime: OPtimeM3,
                            cycle_time: cycleM3,
                            performancerate: (processedM3*cycleM3)/(OPtimeM3/60)
                        }
                    }
                )
                    .sort({ _id: -1 })
                    .then(() => {
                        return null;
                    })
            } else {
                return null;
            }
        }else{
            return null;
        }
    }else{
        return null;
    }
}
//------------------------MACHINE 4-------------------------//
async function updatePerformanceM4() {
    if(statePMCM4==4){
        if(processedM4>0&&OPtimeM4>0&&cycleM4>0){
            if (statePM4 == 4) {
                await performance.updateOne(
                    {
                        $and: [
                            { machine_id: 4 }, { state: 1 }
                        ]
                    },
                    {
                        $set: {
                            processed: processedM4,
                            operationtime: OPtimeM4,
                            cycle_time: cycleM4,
                            performancerate: (processedM4*cycleM4)/(OPtimeM4/60)
                        }
                    }
                )
                    .sort({ _id: -1 })
                    .then(() => {
                        return null;
                    })
            } else {
                return null;
            }
        }else{
            return null;
        }
    }else{
        return null;
    }
}

//--------------------------------------------------API-----------------------------------------------//
//Trigger Performance
async function trigPerformance(params, callback) {
    const perModel = new performance(params);
    perModel.save()
        .then((result) => {
            if (!result) callback("Gagal");
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

//Reset Performance
async function resetPerformance(params,callback){
    var m_id = params.machine_id;
    performance.updateMany({machine_id:m_id},{
        $set:{
            state: 0,
        }
    }).then((response)=>{
        if(!response) callback("Gagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    })
}

//Latest Performance
async function latestPerformance(params,callback){
    var m_id = params.machine_id;
    performance.find({machine_id:m_id}).sort({_id:-1}).limit(1)
    .then((response)=>{
        if(!response)callback("gagal");
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })
}


module.exports = {
    trigPerformance,
    resetPerformance,
    latestPerformance,
}