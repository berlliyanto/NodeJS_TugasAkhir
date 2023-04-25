const cors = require('cors');
require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");

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
            //USERS
            { url: "/api/users", methods: ["POST"] },
            { url: "/api/users/:id", methods: ["PUT"] },
            { url: "/api/users/:id", methods: ["DELETE"] },
            //PARAMETER
            { url: "/api/inputParam", methods: ["POST"] },
            { url: "/api/resetParamM1", methods: ["PUT"] },
            { url: "/api/deleteParam", methods: ["DELETE"] },
            { url: "/api/latestParamM1", methods: ["GET"] },
            { url: "/api/latestParamM2", methods: ["GET"] },
            { url: "/api/latestParamM3", methods: ["GET"] },
            { url: "/api/latestParamM4", methods: ["GET"] },
            //STOCK
            { url: "/api/inputStock", methods: ["POST"] },
            { url: "/api/deleteStock", methods: ["DELETE"] },
            { url: "/api/addStock", methods: ["PUT"] },
            { url: "/api/kurangiStock", methods: ["PUT"] },
            //STATUS
            { url: "/api/insertStat", methods: ["POST"] },
            { url: "/api/statusM1", methods: ["PUT"] },
            { url: "/api/statusM2", methods: ["PUT"] },
            //ENERGY
            { url: "/api/insertEnergy", methods: ["POST"] },
            //PRESSURE
            { url: "/api/insertPressure", methods: ["POST"] },
            //OEE
            { url: "/api/trigOEE", methods: ["POST"] },
            { url: "/api/resetOEE", methods: ["PUT"] },
            //QUALITY
            { url: "/api/trigQuality", methods: ["POST"] },
            { url: "/api/processed", methods: ["PUT"] },
            { url: "/api/resetQuality", methods: ["PUT"] },
            { url: "/api/defect", methods: ["PUT"] },
            //AVAILABILITY
            { url: "/api/trigAvailability", methods: ["POST"] },
            { url: "/api/resetAvailability", methods: ["PUT"] },
            //PERFORMANCE
            { url: "/api/trigPerformance", methods: ["POST"] },
            { url: "/api/resetPerformance", methods: ["PUT"] },
            //COST PRICE
            { url: "/api/trigCost", methods: ["POST"] },
            { url: "/api/resetCost", methods: ["PUT"] },
            //PRODUCTION
            { url: "/api/insertProduction", methods: ["POST"] },
            { url: "/api/resetProcessed", methods: ["PUT"] },
            //LIFETIME
            { url: "/api/trigLT", methods: ["POST"] },
            //TROUBLESHOOT
            { url: "/api/trigTB", methods: ["POST"] },
            { url: "/api/updateTB", methods: ["PUT"] },
            //PREVENTIVE
            { url: "/api/updatePrevStatus", methods: ["PUT"] },
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
const { TOKEN_TELEGRAM_BOT } = require("./config/app.config");
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.TELEBOT_TOKEN);
let chat_ID = '-1001984270471';

bot.start((ctx) => ctx.reply('Welcome to Production Monitoring System, Bot Sudah Siap...'));
bot.help((ctx) => ctx.replyWithHTML('Hello, User'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

bot.command('members', async (ctx) => {
    const chatId = ctx.chat.id;
    try {
        const chatInfo = await ctx.telegram.getChat(chatId);
        const membersCount = chatInfo['members_count'];
        const admins = await ctx.telegram.getChatAdministrators(chatId);
        const members = [];
        
        for (let i = 0; i < membersCount; i += 100) {
            const result = await ctx.telegram.getChatMembers(chatId, {
                limit: 100,
                offset: i
            });
            members.push(...result);
        }
        
        const memberUsernames = [];
        
        for (const member of members) {
            const memberInfo = await ctx.telegram.getChatMember(chatId, member.user.id);
            memberUsernames.push(memberInfo.user.username);
        }
        
        const adminUsernames = admins.map(admin => admin.user.username);

        ctx.reply(`Jumlah anggota grup: ${membersCount}`);
        ctx.reply(`Username admin grup: ${adminUsernames.join(', ')}`);
        ctx.reply(`Username anggota grup: ${memberUsernames.join(', ')}`);
    } catch (err) {
        console.error(err);
        ctx.reply('Terjadi kesalahan saat mengambil daftar anggota grup');
    }
});

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


