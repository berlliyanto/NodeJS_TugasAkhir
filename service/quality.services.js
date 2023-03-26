const { quality } = require('../models/oee.model');
const fetch = require('node-fetch');

const processed1_A = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=1&tipe=A';
const processed1_B = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=1&tipe=B';
const processed1_C = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=1&tipe=C';

const processed2_A = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=2&tipe=A';
const processed2_B = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=2&tipe=B';
const processed2_C = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=2&tipe=C';

const processed3_A = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=3&tipe=A';
const processed3_B = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=3&tipe=B';
const processed3_C = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=3&tipe=C';

const processed4_A = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=4&tipe=A';
const processed4_B = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=4&tipe=B';
const processed4_C = 'https://aplikasi-pms-berli.onrender.com/api/getQualityData?m_id=4&tipe=C';

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
setInterval(fetchM1_A,5000);
setInterval(fetchM1_B,5000);
setInterval(fetchM1_C,5000);
setInterval(fetchM2_A,5000);
setInterval(fetchM2_B,5000);
setInterval(fetchM2_C,5000);
setInterval(fetchM3_A,5000);
setInterval(fetchM3_B,5000);
setInterval(fetchM3_C,5000);
setInterval(fetchM4_A,5000);
setInterval(fetchM4_B,5000);
setInterval(fetchM4_C,5000);

//--------------------------------FETCH--------------------------------------//
//-------------------------------MACHINE 1-----------------------------------//
function fetchM1_A(){
    fetch(processed1_A).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null
        }
        M1_A = data[0].processed;
    }).catch((error)=>{
        return null
    })
}
function fetchM1_B(){
    fetch(processed1_B).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null
        }
        M1_B = data[0].processed;
    }).catch((error)=>{
        return null
    })
}
function fetchM1_C(){
    fetch(processed1_C).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null
        }
        M1_C = data[0].processed;
    }).catch((error)=>{
        return null
    })
}
//-------------------------------MACHINE 2-----------------------------------//
function fetchM2_A(){
    fetch(processed2_A).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M2_A = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
function fetchM2_B(){
    fetch(processed2_B).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M2_B = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
function fetchM2_C(){
    fetch(processed2_C).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M2_C = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
//-------------------------------MACHINE 3-----------------------------------//
function fetchM3_A(){
    fetch(processed3_A).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M3_A = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
function fetchM3_B(){
    fetch(processed3_B).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M3_B = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
function fetchM3_C(){
    fetch(processed3_C).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M3_C = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
//-------------------------------MACHINE 4-----------------------------------//
function fetchM4_A(){
    fetch(processed4_A).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M4_A = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
function fetchM4_B(){
    fetch(processed4_B).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M4_B = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}
function fetchM4_C(){
    fetch(processed4_C).then((result)=>result.json()).then(({data})=>{
        if(data == NaN || data == undefined){
            return null;
        }
        M4_C = data[0].processed;
    }).catch((error)=>{
        return null;
    })
}

//------------------------------FUNGSI MONGODB----------------------------------//
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

//GET DATA QUALITY TERBARU
async function getProcessed(params,callback){
    var tipe = params.tipe
    var m_id = params.m_id
    quality.find({
        $and:[
            {machine_id:Number(m_id)},{state:1},{tipe:tipe}
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
}