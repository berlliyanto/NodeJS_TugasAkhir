const { quality } = require('../models/oee.model');

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

//TRIGGER FUNCTION FETCH
setInterval(fetchM1_A,2100);
setInterval(fetchM1_B,2200);
setInterval(fetchM1_C,2300);
setInterval(fetchM2_A,2400);
setInterval(fetchM2_B,2500);
setInterval(fetchM2_C,2600);
setInterval(fetchM3_A,2700);
setInterval(fetchM3_B,2800);
setInterval(fetchM3_C,2900);
setInterval(fetchM4_A,3000);
setInterval(fetchM4_B,3100);
setInterval(fetchM4_C,3200);

//--------------------------------FETCH--------------------------------------//
//-------------------------------MACHINE 1-----------------------------------//
async function fetchM1_A(){
    const fetchPM1 = await quality.findOne({
        $and:[
            {machine_id:1},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M1_A = fetchPM1.processed;
}
async function fetchM1_B(){
    const fetchPM1 = await quality.findOne({
        $and:[
            {machine_id:1},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M1_B = fetchPM1.processed;
}
async function fetchM1_C(){
    const fetchPM1 = await quality.findOne({
        $and:[
            {machine_id:1},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M1_C = fetchPM1.processed;
}
//-------------------------------MACHINE 2-----------------------------------//
async function fetchM2_A(){
    const fetchPM2 = await quality.findOne({
        $and:[
            {machine_id:2},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M2_A = fetchPM2.processed;
}
async function fetchM2_B(){
    const fetchPM2 = await quality.findOne({
        $and:[
            {machine_id:2},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M2_B = fetchPM2.processed;
}
async function fetchM2_C(){
    const fetchPM2 = await quality.findOne({
        $and:[
            {machine_id:2},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M2_C = fetchPM2.processed;
}
//-------------------------------MACHINE 3-----------------------------------//
async function fetchM3_A(){
    const fetchPM3 = await quality.findOne({
        $and:[
            {machine_id:3},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M3_A = fetchPM3.processed;
}
async function fetchM3_B(){
    const fetchPM3 = await quality.findOne({
        $and:[
            {machine_id:3},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M3_B = fetchPM3.processed;
}
async function fetchM3_C(){
    const fetchPM3 = await quality.findOne({
        $and:[
            {machine_id:3},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M3_C = fetchPM3.processed;
}
//-------------------------------MACHINE 4-----------------------------------//
async function fetchM4_A(){
    const fetchPM4 = await quality.findOne({
        $and:[
            {machine_id:4},{tipe:"A"}
        ]
    }).sort({_id:-1});
    M4_A = fetchPM4.processed;
}
async function fetchM4_B(){
    const fetchPM4 = await quality.findOne({
        $and:[
            {machine_id:4},{tipe:"B"}
        ]
    }).sort({_id:-1});
    M4_B = fetchPM4.processed;
}
async function fetchM4_C(){
    const fetchPM4 = await quality.findOne({
        $and:[
            {machine_id:4},{tipe:"C"}
        ]
    }).sort({_id:-1});
    M4_C = fetchPM4.processed;
}
//---------------------------------API----------------------------------------//

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