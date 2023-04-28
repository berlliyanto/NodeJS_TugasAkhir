const {jadwalPrev} = require('../models/preventive.model');
const {notifikasi} = require('../models/notifikasi.model');
const { preventive } = require('../models/preventive.model');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf(process.env.TELEBOT_TOKEN);
let chat_ID = '-1001984270471';
const jadwalStream = jadwalPrev.watch();

//---------------------------------------------INFO PREVENTIVE-------------------------------------------//

async function jadwalKirimPesan(mesinId, hari, jam, menit) {
    cron.schedule(`${menit} ${jam} * * ${hari}`, () => {
      const message = `*PERAWATAN RUTIN*\nPesan ini ditujukan kepada pihak Maintenance untuk melakukan perbaikan berkala hari Ini pukul ${jam}.${menit} pada Mesin ${mesinId} \n\n Terimakasih`;
      bot.telegram.sendMessage(chat_ID, message);
      console.log(`Pesan terkirim untuk Mesin ${mesinId}`);
      //INSERT DATA
      const preventiveModel = new preventive({
        machine_id: mesinId,
        message: "Perawatan Rutin",
        keterangan: "Not Solved",
        solved: false
    });
    preventiveModel.save((error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Dokumen berhasil disimpan');
            }
        }).then(()=>{});
    },{timezone:'Asia/Jakarta'});
  }

  async function sendNotification() {
    try {
      const mesin1 = await jadwalPrev.findOne({ machine_id: 1 });
      const mesin2 = await jadwalPrev.findOne({ machine_id: 2 });
      const mesin3 = await jadwalPrev.findOne({ machine_id: 3 });
      const mesin4 = await jadwalPrev.findOne({ machine_id: 4 });
  
      await jadwalKirimPesan(1, mesin1.hari, mesin1.jam, mesin1.menit);
      await jadwalKirimPesan(2, mesin2.hari, mesin2.jam, mesin2.menit);
      await jadwalKirimPesan(3, mesin3.hari, mesin3.jam, mesin3.menit);
      await jadwalKirimPesan(4, mesin4.hari, mesin4.jam, mesin4.menit);

    } catch (error) {
      console.error(error);
    }
  }
  sendNotification();
  jadwalStream.on('change', async(change)=>{
    sendNotification();
  })
//
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
    var idprev = params.idpreventive;
    preventive.findOneAndUpdate({
        $and:[
            {machine_id:m_id},{_id:idprev}
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
    preventive.find({machine_id:m_id}).sort({_id:-1}).limit(100)
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
    jadwalPrev.find()
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