const cors = require('cors');
require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const errors = require("./middleware/errors");
const { unless } = require("express-unless");

mongoose.Promise = global.Promise;
var Port = process.env.port || 5000;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("Database Connected to : Database Berli");
    },
    (error) => {
        console.log("Database can't connected " + error);
    }
);

app.use(cors());
//--------------------------------------------------------Authentication--------------------------------------------------------------//
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            //AUTH
            { url: "/api/login", methods: ["POST"] },
            { url: "/api/register", methods: ["POST"] },
            //PARAMETER
            { url: "/api/latestParamM1", methods: ["GET"] },
            { url: "/api/latestParamM2", methods: ["GET"] },
            { url: "/api/latestParamM3", methods: ["GET"] },
            { url: "/api/latestParamM4", methods: ["GET"] },
            //STOCK
            { url: "/api/kurangiStock", methods: ["PUT"] },
            //STATUS
            { url: "/api/insertStat", methods: ["POST"] },
            { url: "/api/updateStatusM", methods: ["PUT"] },
            //ENERGY
            { url: "/api/insertEnergy", methods: ["POST"] },
            { url: "/api/averagepower", methods: ["GET"] },
            
            //PRESSURE
            { url: "/api/insertPressure", methods: ["POST"] },
            { url: "/api/deletePressure", methods: ["DELETE"] },
            //QUALITY
            { url: "/api/processed", methods: ["PUT"] },
            //AVAILABILITY
            { url: "/api/latestAvailability", methods: ["GET"] },
        ],
    })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);

app.listen(Port, function () {
    console.log("Connected to : ", Port);
});

//--------------------------------------------------------NOTIFIKASI--------------------------------------------------------------//
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.TELEBOT_TOKEN);
let chat_ID = '-1001984270471';

bot.start((ctx) => ctx.reply('Welcome to Production Monitoring System, Bot Sudah Siap...'));
bot.help((ctx) => ctx.replyWithHTML('Hello, User'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

//------------------------API TELEBOT---------------------------//
app.post('/sendMessageTB', async (req, res) => {
    var machine_id = req.query.machine_id;
    var from = req.body.from;
    var to = req.body.to;
    var message = req.body.message;
    const text = `*INFO*\n\n Dari: *${from}*\nUntuk: *${to}*\n\nMeminta melakukan order perbaikan Mesin ${machine_id} dengan pesan berikut :\n*${message}*`;
    bot.telegram.sendMessage(chat_ID, text,);
    res.send('Message sent');
});

//--------------------------------------------------------KONDISI MESIN MATI / TIDAK MATI--------------------------------------------------------------//
const { energy } = require('./models/energy.model');
const { status } = require('./models/status.model');
let statusPlant = false;
let timer;
app.get('/kondisiMesin', (req, res) => {
    res.status(200).json({ status: statusPlant });
});
// Inisialisasi change stream
const dataChangeStream = energy.watch();

// Event listener untuk perubahan pada koleksi
dataChangeStream.on('change', (change) => {
    // Mengatur status menjadi true ketika terjadi perubahan
    if (change.operationType === 'insert') {
        statusPlant = true;

        // Mengatur ulang timer
        clearTimeout(timer);
        timer = setTimeout(() => {
            status.updateMany({}, {
                $set: {
                    status: 0
                }
            }).then(() => {
                console.log("All status to 0");
             }).catch((error)=>{
                console.log(error);
             });
            statusPlant = false;
        }, 6000); // I
    }
}
);