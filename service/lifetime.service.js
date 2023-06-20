const { lifetime } = require('../models/lifetime.model');

//--------------------------------NOTIFIKASI----------------------------------//
const chat_ID = '-1001984270471';
const { Telegraf } = require('telegraf');
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

let waktuLT1;
let waktuLT2;
let waktuLT3;
let waktuLT4;

let finish1 = false;
let finish2 = false;
let finish3 = false;
let finish4 = false;

async function fetchLT() {
    const fetchLT1 = await lifetime.findOne({ machine_id: 1 });
    const fetchLT2 = await lifetime.findOne({ machine_id: 2 });
    const fetchLT3 = await lifetime.findOne({ machine_id: 3 });
    const fetchLT4 = await lifetime.findOne({ machine_id: 4 });

    waktuLT1 = fetchLT1.timevalue;
    waktuLT2 = fetchLT2.timevalue;
    waktuLT3 = fetchLT3.timevalue;
    waktuLT4 = fetchLT4.timevalue;
}

function notifikasi() {
    switch (waktuLT1) {
        case 3600:
            if (!finish1) {
                const startTime = new Date();
                sendTelegramMessage(chat_ID, "INFO !!!\n\nUmur mesin 1 sudah kurang dari 1 Jam...\n\nKepada pihak maintenance mohon segera lakukan pemeliharaan");
                const endTime = new Date();
                const response = startTime.getTime() - endTime.getTime();

                const startTimeFormatted = startTime.toLocaleString();
                const endTimeFormatted = endTime.toLocaleString();
                bot.telegram.sendMessage(chat_ID, `triggerNotif : ${startTimeFormatted} - sendNotif : ${endTimeFormatted},\nResponse Notifikasi : ${response.toFixed(2)}`)
                finish1 = true;
            }
            finish1 = false;
        default:
    }
    switch (waktuLT2) {
        case 3600:
            if (!finish2) {
                sendTelegramMessage(chat_ID, "INFO !!!\n\nUmur mesin 2 sudah kurang dari 1 Jam...\n\nKepada pihak maintenance mohon segera lakukan pemeliharaan");
                finish2 = true;
            }
            finish2 = false;
        default:
    }
    switch (waktuLT3) {
        case 3600:
            if (!finish3) {
                sendTelegramMessage(chat_ID, "INFO !!!\n\nUmur mesin 3 sudah kurang dari 1 Jam...\n\nKepada pihak maintenance mohon segera lakukan pemeliharaan");
                finish3 = true;
            }
            finish3 = false;
        default:
    }
    switch (waktuLT4) {
        case 3600:
            if (!finish4) {
                sendTelegramMessage(chat_ID, "INFO !!!\n\nUmur mesin 4 sudah kurang dari 1 Jam...\n\nKepada pihak maintenance mohon segera lakukan pemeliharaan");
                finish4 = true;
            }
            finish4 = false
        default:
    }
}

setInterval(() => {
    fetchLT();
    notifikasi();
}, 1000);

//---------------------------------API----------------------------------------//

//Trigger Lifetime Mesin 
async function trigLifetime(params, callback) {
    if (!params) {
        return callback("param required");
    }
    const avaiModel = new lifetime(params);
    avaiModel.save().then((result) => {
        if (!result) callback("Gagal");
        return callback(null, result);
    }).catch((error) => {
        return callback(error);
    })
}

//Get ALL Lifetime
async function getLifetime(params, callback) {
    lifetime.find().then((response) => {
        if (!response) callback("Gagal");
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

//Get ONE Lifetime
async function getOneLT(params, callback) {
    var m_id = params.machine_id
    lifetime.findOne({ machine_id: m_id }).then((response) => {
        if (!response) callback("Gagal");
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

//Update Lifetime mesin
async function updateLT(params, callback) {
    var m_id = params.machine_id;
    var timevalue = params.timevalue
    lifetime.findOneAndUpdate({ machine_id: m_id },
        {
            $inc: {
                timevalue: timevalue
            }
        }
    )
        .then((response) => {
            if (!response) return callback("Gagal");
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })
}

module.exports = {
    getLifetime,
    getOneLT,
    trigLifetime,
    updateLT
}
