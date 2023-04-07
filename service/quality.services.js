const { quality } = require('../models/oee.model');
const {parameter} = require ('../models/param.model');

//VARIABEL PROCESSED
let M1_A;
let M1_B;
let M1_C;
let M2_A;
let M2_B;
let M2_C;
let M3_A;
let M3_B;
let M3_C;
let M4_A;
let M4_B;
let M4_C;

//Variabel Defect
let M1D_A;
let M1D_B;
let M1D_C;
let M2D_A;
let M2D_B;
let M2D_C;
let M3D_A;
let M3D_B;
let M3D_C;
let M4D_A;
let M4D_B;
let M4D_C;

//Variable Parameter
let MPT1;
let MPT2;
let MPT3;
let MPT4;
let MPS1;
let MPS2;
let MPS3;
let MPS4;

//TRIGGER FUNCTION FETCH
function runAllFunctions() {
    fetchM1_A();
    fetchM1_B();
    fetchM1_C();
    fetchM2_A();
    fetchM2_B();
    fetchM2_C();
    fetchM3_A();
    fetchM3_B();
    fetchM3_C();
    fetchM4_A();
    fetchM4_B();
    fetchM4_C();
  }
  
setInterval(runAllFunctions, 2000);
  
//CLEAR INTERVAL
// setTimeout(function() {
//     clearInterval(invtal);
// }, 1000000);

//--------------------------------FETCH--------------------------------------//
//-------------------------------MACHINE 1-----------------------------------//
async function fetchM1_A(){
    const fetchP1 = await parameter.findOne({
        $and:[
            {machine_id:1}
        ]
    }).sort({_id:-1});
    const fetchPM1 = await quality.findOne({
        $and:[
            {machine_id:1},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M1_A = fetchPM1.processed;
    M1D_A = fetchPM1.defect;
    MPT1 = fetchP1.tipe_benda;
    MPS1 = fetchP1.state;
}
async function fetchM1_B(){
    const fetchPM1 = await quality.findOne({
        $and:[
            {machine_id:1},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M1_B = fetchPM1.processed;
    M1D_B = fetchPM1.defect;
}
async function fetchM1_C(){
    const fetchPM1 = await quality.findOne({
        $and:[
            {machine_id:1},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M1_C = fetchPM1.processed;
    M1D_C = fetchPM1.defect;
}
//-------------------------------MACHINE 2-----------------------------------//
async function fetchM2_A(){
    const fetchP2 = await parameter.findOne({
        $and:[
            {machine_id:2}
        ]
    }).sort({_id:-1});
    const fetchPM2 = await quality.findOne({
        $and:[
            {machine_id:2},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M2_A = fetchPM2.processed;
    M2D_A = fetchPM2.defect;
    MPT2 = fetchP2.tipe_benda;
    MPS2 = fetchP2.state;
}
async function fetchM2_B(){
    const fetchPM2 = await quality.findOne({
        $and:[
            {machine_id:2},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M2_B = fetchPM2.processed;
    M2D_B = fetchPM2.defect;
}
async function fetchM2_C(){
    const fetchPM2 = await quality.findOne({
        $and:[
            {machine_id:2},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M2_C = fetchPM2.processed;
    M2D_C = fetchPM2.defect;
}
//-------------------------------MACHINE 3-----------------------------------//
async function fetchM3_A(){
    const fetchP3 = await parameter.findOne({
        $and:[
            {machine_id:3}
        ]
    }).sort({_id:-1});
    const fetchPM3 = await quality.findOne({
        $and:[
            {machine_id:3},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M3_A = fetchPM3.processed;
    M3D_A = fetchPM3.defect;
    MPT3 = fetchP3.tipe_benda;
    MPS3 = fetchP3.state;
}
async function fetchM3_B(){
    const fetchPM3 = await quality.findOne({
        $and:[
            {machine_id:3},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M3_B = fetchPM3.processed;
    M3D_B = fetchPM3.defect;
}
async function fetchM3_C(){
    const fetchPM3 = await quality.findOne({
        $and:[
            {machine_id:3},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M3_C = fetchPM3.processed;
    M3D_C = fetchPM3.defect;
}
//-------------------------------MACHINE 4-----------------------------------//
async function fetchM4_A(){
    const fetchP4 = await parameter.findOne({
        $and:[
            {machine_id:4}
        ]
    }).sort({_id:-1});
    const fetchPM4 = await quality.findOne({
        $and:[
            {machine_id:4},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M4_A = fetchPM4.processed;
    M4D_A = fetchPM4.defect;
    MPT4 = fetchP4.tipe_benda;
    MPS4 = fetchP4.state;
}
async function fetchM4_B(){
    const fetchPM4 = await quality.findOne({
        $and:[
            {machine_id:4},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M4_B = fetchPM4.processed;
    M4D_B = fetchPM4.defect;
}
async function fetchM4_C(){
    const fetchPM4 = await quality.findOne({
        $and:[
            {machine_id:4},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M4_C = fetchPM4.processed;
    M4D_C = fetchPM4.defect;
}
//---------------------------QUERY--------------------------//
const qualityStream = quality.watch();

qualityStream.on('change', async(change)=>{
    if(change.operationType == 'update'){
        //MACHINE 1
        if(MPS1==1){
            if(M1_A>0){
                if(MPT1=="A"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:1},{tipe:"A"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M1_A - M1D_A)/M1_A
                        }
                    })
                }else if(MPT1=="B"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:1},{tipe:"B"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M1_B - M1D_B)/M1_B
                        }
                    })
                }else if(MPT1=="C"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:1},{tipe:"C"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M1_C - M1D_C)/M1_C
                        }
                    })
                }
            } 
        }
        //MACHINE 2
        if(MPS2==1){
            if(M2_A>0){
                if(MPT2=="A"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:2},{tipe:"A"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M2_A - M2D_A)/M2_A
                        }
                    })
                }else if(MPT2=="B"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:2},{tipe:"B"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M2_B - M2D_B)/M2_B
                        }
                    })
                }else if(MPT2=="C"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:2},{tipe:"C"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M2_C - M2D_C)/M2_C
                        }
                    })
                }
            } 
        }
        //MACHINE 3
        if(MPS3==1){
            if(M3_A>0){
                if(MPT3=="A"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:3},{tipe:"A"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M3_A - M3D_A)/M3_A
                        }
                    })
                }else if(MPT3=="B"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:3},{tipe:"B"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M3_B - M3D_B)/M3_B
                        }
                    })
                }else if(MPT3=="C"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:3},{tipe:"C"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M3_C - M3D_C)/M3_C
                        }
                    })
                }
            } 
        }
        //MACHINE 4
        if(MPS4==1){
            if(M4_A>0){
                if(MPT4=="A"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:4},{tipe:"A"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M4_A - M4D_A)/M4_A
                        }
                    })
                }else if(MPT4=="B"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:4},{tipe:"B"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M4_B - M4D_B)/M4_B
                        }
                    })
                }else if(MPT4=="C"){
                    quality.findOneAndUpdate({
                        $and:[
                            {machine_id:4},{tipe:"C"},{state:1}
                        ]
                    },{
                        $set:{
                            qualityrate: (M4_C - M4D_C)/M4_C
                        }
                    })
                }
            } 
        }
    }
})

//------------------------------------------------------------API--------------------------------------------------------------//

//TRIGGER QUALITY FOR COUNTING
async function firstQuality(params,callback){
    if(!params){
        return callback("No Data");
    }

    const qualityModel = new quality(params);
    qualityModel.save().then((response)=>{
        if(!response) callback("gagal");
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}
//GET DATA FOR RECORD QUALITY
async function recQuality(params,callback){
    var m_id = params.m_id;
    quality.find({machine_id:Number(m_id)}).sort({_id:-1}).limit(30)
    .then((response)=>{
        if(!response) callback("GAGAL");
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    })
}

//GET 4 DATA FOR DASHBOARD QUALITY
async function dashQuality(machine_id){
    const latestdata =[];
    for (const id of machine_id) {
        const result = await quality.findOne({machine_id:id}).sort({ _id: -1 }).select('machine_id processed good defect tipe state');
        latestdata.push(result);
    }
    return latestdata;
}

//GET DATA QUALITY TERBARU
async function getProcessed(params,callback){
    var tipe = params.tipe
    var m_id = params.m_id
    quality.find({
        $and:[
            {machine_id:Number(m_id)},{tipe:tipe}
        ]
    }).sort({_id:-1}).limit(1).then((response)=>{
        if(!response) callback("GAGAL");
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
}

//UPDATE PROCESSED DATA
async function processed(params, callback){
    var tipe = params.tipe
    var m_id = params.m_id
    quality.updateOne({
        $and:[
            {machine_id:Number(m_id)},{state:1},{tipe:tipe}
        ]
    },{
        $inc:{
            processed: 1,
            good: 1
        }
    }).sort({_id : -1}).then((response)=>{
        if(!response) callback("GAGAL")
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
}

//RESET STATE QUALITY
async function resetQuality(params,callback){
    var m_id = params.m_id
    quality.updateMany({machine_id: Number(m_id)},{
        $set:{
            state: 0
        }
    }).then((response)=>{
        if(!response) callback("GAGAL");
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
}

//INSERT DEFECT UNIT
async function Defect(params, callback){
    var tipe = params.tipe
    var m_id = params.m_id
    var defect = params.defect
    //-------------------------------MACHINE 1-----------------------------------//
    if(m_id==1){
        if(tipe=="A"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M1_A - defect,
                    qualityrate: (M1_A - defect) / M1_A
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="B"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M1_B - defect,
                    qualityrate: (M1_B - defect) / M1_B
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="C"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M1_C - defect,
                    qualityrate: (M1_C - defect) / M1_C
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }
    //-------------------------------MACHINE 2-----------------------------------//
    }else if(m_id==2){
        if(tipe=="A"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M2_A - defect,
                    qualityrate: (M2_A - defect) / M2_A
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="B"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M2_B - defect,
                    qualityrate: (M2_B - defect) / M2_B
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="C"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M2_C - defect,
                    qualityrate: (M2_C - defect) / M2_C
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }
    //-------------------------------MACHINE 3-----------------------------------//
    }else if(m_id==3){
        if(tipe=="A"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M3_B - defect,
                    qualityrate: (M3_B - defect) / M3_B
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="B"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M3_B - defect,
                    qualityrate: (M3_B - defect) / M3_B
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="C"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M3_C - defect,
                    qualityrate: (M3_C - defect) / M3_C
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }
    //-------------------------------MACHINE 4-----------------------------------//
    }else if(m_id==4){
        if(tipe=="A"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M4_B - defect,
                    qualityrate: (M4_B - defect) / M4_B
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="B"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M4_B - defect,
                    qualityrate: (M4_B - defect) / M4_B
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }else if(tipe=="C"){
            quality.updateOne({
                $and:[
                    {machine_id:Number(m_id)},{state:1},{tipe:tipe}
                ]
            },{
                $set:{
                    defect: defect,
                    good: M4_C - defect,
                    qualityrate: (M4_C - defect) / M4_C
                }
            }).sort({_id:-1}).then((response)=>{
                if(!response) callback('GAGAL');
                return callback(null, response);
            }).catch((error)=>{
                return callback(error);
            })
        }
    }

}

module.exports = {
    recQuality,
    firstQuality,
    processed,
    getProcessed,
    Defect,
    resetQuality,
    dashQuality,
}