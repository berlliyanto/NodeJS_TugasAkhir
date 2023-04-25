const {jadwalPrev} = require('../models/preventive.model');
const {notifikasi} = require('../models/notifikasi.model');
const { preventive } = require('../models/preventive.model');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.TELEBOT_TOKEN);
let chat_ID = '-1001984270471';

var hari1;
var hari2;
var hari3;
var hari4;

var jam1;
var jam2;
var jam3;
var jam4;

var menit1;
var menit2;
var menit3;
var menit4;

function runAll(){
    Mesin1();
    Mesin2();
    Mesin3();
    Mesin4();
}
setInterval(runAll,1000);

//---------------------------------------------INFO PREVENTIVE-------------------------------------------//
async function Mesin1(){
    const fetchM1 = await jadwalPrev.findOne({machine_id:1});
    hari1 = fetchM1.hari;
    jam1 = fetchM1.jam;
    menit1 = fetchM1.menit;
}
async function Mesin2(){
    const fetchM2 = await jadwalPrev.findOne({machine_id:2});
    hari2 = fetchM2.hari;
    jam2 = fetchM2.jam;
    menit2 = fetchM2.menit;
}
async function Mesin3(){
    const fetchM3 = await jadwalPrev.findOne({machine_id:3});
    hari3 = fetchM3.hari;
    jam3 = fetchM3.jam;
    menit3 = fetchM3.menit;
}
async function Mesin4(){
    const fetchM4 = await jadwalPrev.findOne({machine_id:4});
    hari4 = fetchM4.hari;
    jam4 = fetchM4.jam;
    menit4 = fetchM4.menit;
}

setTimeout(() => {
    cron.schedule(`${menit1} ${jam1} * * ${hari1}`, () => {
        const message = '*PERAWATAN BERKALA*\nPesan ini ditujukan kepada pihak Maintenance untuk melakukan perbaikan berkala pada Mesin 1 \n\n Terimakasih';
        bot.telegram.sendMessage(chat_ID, message);
      });
    cron.schedule(`${menit2} ${jam2} * * ${hari2}`, () => {
        const message = '*PERAWATAN BERKALA*\nPesan ini ditujukan kepada pihak Maintenance untuk melakukan perbaikan berkala pada Mesin 2 \n\n Terimakasih';
        bot.telegram.sendMessage(chat_ID, message);
      });
    cron.schedule(`${menit3} ${jam3} * * ${hari3}`, () => {
        const message = '*PERAWATAN BERKALA*\nPesan ini ditujukan kepada pihak Maintenance untuk melakukan perbaikan berkala pada Mesin 3 \n\n Terimakasih';
        bot.telegram.sendMessage(chat_ID, message);
      });
    cron.schedule(`${menit4} ${jam4} * * ${hari4}`, () => {
        const message = '*PERAWATAN BERKALA*\nPesan ini ditujukan kepada pihak Maintenance untuk melakukan perbaikan berkala pada Mesin 4 \n\n Terimakasih';
        bot.telegram.sendMessage(chat_ID, message);
      });
}, 5000);
//----------------------------------------------API----------------------------------------------------------//
//--------------NOTIFIKASI 5 MENIT SIDANG----------------------//
async function getNotifikasiFiveMenit(machine_id){
    const latestdata = [];
    for (const id of machine_id) {
        const result = await notifikasi.findOne({$and:[
            {machine_id:id},{trigger:true}
        ]}).sort({ _id: -1 });
        latestdata.push(result);
    }
    return latestdata;
}

async function getNotifikasi(params,callback){
    var m_id = params.machine_id;
    notifikasi.find({$and:[
        {machine_id:m_id},{time: {$gt:0}}
    ]}).sort({_id:-1})
    .then((response)=>{
        if(!response) callback("Gagal");
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    })
}

//-------------------PREVENTIVE MAINTENANCE----------------------//

async function updatePreventive(params, callback){
    var m_id = params.machine_id;
    preventive.findOneAndUpdate({
        $and:[
            {machine_id:m_id},{solved:false}
        ]
    },{
        $set:{
            solved: true,
            keterangan: params.keterangan,
        }
    })
    .then((response)=>{
        if(!response) callback("Gagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function getPreventive(params, callback){
    var m_id = params.machine_id
    preventive.find({machine_id:m_id}).sort({_id:-1})
    .then((response)=>{
        if(!response) callback("Gagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function jadwalPreventive(params, callback){
    var m_id = params.machine_id;
    var jam = params.jam;
    var hari = params.hari;
    var menit = params.menit;
    jadwalPrev.updateOne({
        machine_id: m_id
    },
    {
        $set:{
            hari: hari,
            jam: jam,
            menit: menit
        }
    })
    .then((response)=>{
        if(!response) callback("Gagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function getJadwalPrev(params, callback){
    jadwalPrev.find({machine_id:params.machine_id}).sort({_id:-1})
    .then((response)=>{
        if(!response) callback("Gagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

module.exports = {
    getJadwalPrev,
    jadwalPreventive,
    getPreventive,
    updatePreventive,
    getNotifikasiFiveMenit,
    getNotifikasi,
}