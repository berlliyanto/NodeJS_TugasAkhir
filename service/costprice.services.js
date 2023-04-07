
const {price} = require('../models/costprice.model');
const {cost} = require('../models/costprice.model');
const { quality } = require('../models/oee.model');
const { parameter } = require('../models/param.model');

//-------------------------------------COST-----------------------------------------//
//VARIABLE STATE PARAMETER
var statePM1;
var statePM2;
var statePM3;
var statePM4;

//VARIABEL TIPE BENDA
var tipeM1;
var tipeM2;
var tipeM3;
var tipeM4;

//VARIABEL PROCESSED
var goodM1;
var goodM2;
var goodM3;
var goodM4;

//VARIABEL HARGA TIPE
var hargaA;
var hargaB;
var hargaC;

//VARIABEL STATE COST
var stateCM1;
var stateCM2;
var stateCM3;
var stateCM4;

let intervalCM1;
let intervalCM2;
let intervalCM3;
let intervalCM4;

//TIMER FETCH
function runAllFunctions() {
    fetchHarga();
    fetchM1();
    fetchM2();
    fetchM3();
    fetchM4();
    updateCM1();
    updateCM2();
    updateCM3();
    updateCM4();
  }
  
 let inval =  setInterval(runAllFunctions, 1000);

//CLEAR INTERVAL
setTimeout(function() {
    clearInterval(inval);
}, 1000000);

//-------------------------------FETCH-----------------------------//
//--------------HARGA-----------------//
async function fetchHarga(){
    const fetchHUA = await price.findOne({tipe:"A"}).sort({_id:-1});
    const fetchHUB = await price.findOne({tipe:"B"}).sort({_id:-1});
    const fetchHUC = await price.findOne({tipe:"C"}).sort({_id:-1});

    hargaA = fetchHUA.price_total;
    hargaB = fetchHUB.price_total;
    hargaC = fetchHUC.price_total;
}

//--------------MACHINE 1-----------------//
async function fetchM1(){
    const fetchTM1 = await parameter.findOne({
        $and:[
            {machine_id:1}
        ]
    }).sort({_id:-1});
    const fetchGM1 = await quality.findOne({
        $and:[
            {machine_id:1}
        ]
    }).sort({_id:-1});
    const fetchCM1 = await cost.findOne({
        $and:[
            {machine_id:1}
        ]
    }).sort({_id:-1});
    tipeM1 = fetchTM1.tipe_benda;
    statePM1 = fetchTM1.state;
    goodM1 = fetchGM1.good;
    stateCM1 = fetchCM1.state;
}
//--------------MACHINE 2-----------------//
async function fetchM2(){
    const fetchTM2 = await parameter.findOne({
        $and:[
            {machine_id:2}
        ]
    }).sort({_id:-1});
    const fetchGM2 = await quality.findOne({
        $and:[
            {machine_id:2}
        ]
    }).sort({_id:-1});
    const fetchCM2 = await cost.findOne({
        $and:[
            {machine_id:2}
        ]
    }).sort({_id:-1});
    tipeM2 = fetchTM2.tipe_benda;
    statePM2 = fetchTM2.state;
    goodM2 = fetchGM2.good;
    stateCM2 = fetchCM2.state;
}
//--------------MACHINE 3-----------------//
async function fetchM3(){
    const fetchTM3 = await parameter.findOne({
        $and:[
            {machine_id:3}
        ]
    }).sort({_id:-1});
    const fetchGM3 = await quality.findOne({
        $and:[
            {machine_id:3}
        ]
    }).sort({_id:-1});
    const fetchCM3 = await cost.findOne({
        $and:[
            {machine_id:3}
        ]
    }).sort({_id:-1});
    tipeM3 = fetchTM3.tipe_benda;
    statePM3 = fetchTM3.state;
    goodM3 = fetchGM3.good;
    stateCM3 = fetchCM3.state;
}
//--------------MACHINE 4-----------------//
async function fetchM4(){
    const fetchTM4 = await parameter.findOne({
        $and:[
            {machine_id:4}
        ]
    }).sort({_id:-1});
    const fetchGM4 = await quality.findOne({
        $and:[
            {machine_id:4}
        ]
    }).sort({_id:-1});
    const fetchCM4 = await cost.findOne({
        $and:[
            {machine_id:4}
        ]
    }).sort({_id:-1});
    tipeM4 = fetchTM4.tipe_benda;
    statePM4 = fetchTM4.state;
    goodM4 = fetchGM4.good;
    stateCM4 = fetchCM4.state;
}
//-------------------------------QUERY-----------------------------//
//------------------------MACHINE 1------------------------//
async function updateCM1(){
    if(stateCM1==1){
        if(statePM1>0&&goodM1>0){
            if(tipeM1=="A"){
                await cost.updateOne({
                    $and:[
                        {machine_id:1},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM1,
                        good: goodM1,
                        harga_unit: hargaA,
                        total_harga: goodM1*hargaA,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM1=="B"){
                await cost.updateOne({
                    $and:[
                        {machine_id:1},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM1,
                        good: goodM1,
                        harga_unit: hargaB,
                        total_harga: goodM1*hargaB,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM1=="C"){
                await cost.updateOne({
                    $and:[
                        {machine_id:1},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM1,
                        good: goodM1,
                        harga_unit: hargaC,
                        total_harga: goodM1*hargaC,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }
        }else{
            return null;
        }
    }else{
        return null;
    }
}
async function updateCM2(){
    if(stateCM2==1){
        if(statePM2>0&&goodM2>0){
            if(tipeM2=="A"){
                await cost.updateOne({
                    $and:[
                        {machine_id:2},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM2,
                        good: goodM2,
                        harga_unit: hargaA,
                        total_harga: goodM2*hargaA,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM2=="B"){
                await cost.updateOne({
                    $and:[
                        {machine_id:2},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM2,
                        good: goodM2,
                        harga_unit: hargaB,
                        total_harga: goodM2*hargaB,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM2=="C"){
                await cost.updateOne({
                    $and:[
                        {machine_id:2},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM2,
                        good: goodM2,
                        harga_unit: hargaC,
                        total_harga: goodM2*hargaC,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }
        }
    }
}
async function updateCM3(){
    if(stateCM3==1){
        if(statePM3>0&&goodM3>0){
            if(tipeM3=="A"){
                await cost.updateOne({
                    $and:[
                        {machine_id:3},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM3,
                        good: goodM3,
                        harga_unit: hargaA,
                        total_harga: goodM3*hargaA,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM3=="B"){
                await cost.updateOne({
                    $and:[
                        {machine_id:3},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM3,
                        good: goodM3,
                        harga_unit: hargaB,
                        total_harga: goodM3*hargaB,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM3=="C"){
                await cost.updateOne({
                    $and:[
                        {machine_id:3},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM3,
                        good: goodM3,
                        harga_unit: hargaC,
                        total_harga: goodM3*hargaC,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }
        }
    }
}
async function updateCM4(){
    if(stateCM4==1){
        if(statePM4>0&&goodM4>0){
            if(tipeM4=="A"){
                await cost.updateOne({
                    $and:[
                        {machine_id:4},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM4,
                        good: goodM4,
                        harga_unit: hargaA,
                        total_harga: goodM4*hargaA,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM4=="B"){
                await cost.updateOne({
                    $and:[
                        {machine_id:4},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM4,
                        good: goodM4,
                        harga_unit: hargaB,
                        total_harga: goodM4*hargaB,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }else if(tipeM4=="C"){
                await cost.updateOne({
                    $and:[
                        {machine_id:4},{state:1}
                    ]
                },
                {
                    $set:{
                        tipe: tipeM4,
                        good: goodM4,
                        harga_unit: hargaC,
                        total_harga: goodM4*hargaC,
                    }
                }
                ).sort({_id:-1}).then(()=>{});
            }
        }
    }
}

//-------------------------------------------API-----------------------------------------//
//TRIGGER COST PRICE
async function trigCost(params, callback){
    const costModel = new cost(params);
    costModel
    .save()
    .then((result)=>{
        if(!result) callback("Gagal");
        return callback(null,result);
    })
    .catch((error)=>{
        return callback(error);
    })
}

//GET DATA PRICE LIST
async function getPricelist(params,callback){
    price.find().then((result)=>{
        if(!result) callback("Gagal");
        return callback(null,result);
    })
    .catch((error)=>{
        callback(error);
    })
}

//GET DATA LATEST COST
async function getCost(params,callback){
    m_id = params.m_id;
    cost.find({machine_id:m_id}).sort({_id:-1}).limit(1)
    .then((result)=>{
        if(!result) callback("GAGAL");
        return callback(null,result);
    })
    .catch((error)=>{
        return callback(error);
    })
}
//GET DATA LATEST COST
async function getCostHistory(params,callback){
    m_id = params.m_id;
    cost.find({machine_id:m_id}).sort({_id:-1}).limit(30)
    .then((result)=>{
        if(!result) callback("GAGAL");
        return callback(null,result);
    })
    .catch((error)=>{
        return callback(error);
    })
}

//RESET STATE COST
async function resetCost(params,callback){
    m_id=params.m_id;
    cost.updateMany({machine_id:m_id},{
        $set:{
            state:0
        }
    }).then((response)=>{
        if(!response) callback("GAGAL");
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    })
}
module.exports = {
    getCostHistory,
    resetCost,
    getCost,
    trigCost,
    getPricelist,
}