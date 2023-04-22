const cors = require('cors');

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

mongoose.connect(MONGO_DB_CONFIG.DB, {
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
        ],
    })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);

app.get('/qrcode', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

app.listen(Port, function () {
    console.log("Connected to : ", Port);
});


//--------------------------------------------------------NOTIFIKASI--------------------------------------------------------------//
const { TOKEN_TELEGRAM_BOT } = require("./config/app.config");
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(TOKEN_TELEGRAM_BOT.TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();


