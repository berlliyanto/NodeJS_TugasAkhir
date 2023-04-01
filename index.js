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
            { url: "/api/OEE", methods: ["POST"] },
            //QUALITY
            { url: "/api/trigQuality", methods: ["POST"] },
            { url: "/api/processed", methods: ["PUT"] },
            { url: "/api/resetQuality", methods: ["PUT"] },
            { url: "/api/defect", methods: ["PUT"] },
            //AVAILABILITY
            { url: "/api/trigAvailability", methods: ["POST"] },
            //PRODUCTION
            { url: "/api/insertProduction", methods: ["POST"] },
            { url: "/api/resetProcessed", methods: ["PUT"] },

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

// const { Client } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const client = new Client();

// const User = require('./models/auth.model');
// const UserStream = User.watch();
// const { availability } = require('./models/oee.model');
// const availabilityStream = availability.watch();
// const { parameter } = require('./models/param.model');

// //--------------------------------------------WHATSAPP BOT CLIENT-----------------------------------------------//

// client.on('qr', (qr) => {
//     qrcode.generate(qr, { small: true });
// });

// client.on('ready', () => {
//     console.log("Client is ready");
// });

// client.on('message', async (msg) => {
//     if (msg.body === '!ping') {
//         msg.reply('pong');
//     }
// })

// client.initialize();

// //NO HANDPHONE TERDAFTAR
// let phoneUser = [];
// setInterval(phone,2000);
// async function phone() {
//     const FetchHP = await User.find({});
//     FetchHP.forEach(function (doc) {
//         const numberPhone = doc.noHp;
//         if (!phoneUser.includes(numberPhone)) {
//             phoneUser.push(numberPhone);
//         }
//     },
//     )
//     console.log(phoneUser);
// }

// //SEND MESSAGES TO CONTACTS
// const sendMessages = async (phone, message) => {
//     try {
//         const promises = phone.map(number => client.sendMessage(`${number}@c.us`, message));
//         await Promise.all(promises);
//         console.log(`Message "${message}" sent to ${phone.length} contacts`);
//     } catch (err) {
//         console.error('Error sending message:', err);
//     }
// };

// availabilityStream.on('change', async (change) => {
//     if (change.operationType === 'update') {
//         const paramM1 = await parameter.findOne({ machine_id: 1 }).sort({ _id: -1 });
//         const paramM2 = await parameter.findOne({ machine_id: 2 }).sort({ _id: -1 });
//         const paramM3 = await parameter.findOne({ machine_id: 3 }).sort({ _id: -1 });
//         const paramM4 = await parameter.findOne({ machine_id: 4 }).sort({ _id: -1 });

//         const docM1 = await availability.findOne({ machine_id: 1 }).sort({ _id: -1 });
//         const docM2 = await availability.findOne({ machine_id: 2 }).sort({ _id: -1 });
//         const docM3 = await availability.findOne({ machine_id: 3 }).sort({ _id: -1 });
//         const docM4 = await availability.findOne({ machine_id: 4 }).sort({ _id: -1 });

//         if (docM1 && docM1.runningtime >= (paramM1.loading_time) * 60) {
//             const phone = phoneUser; // daftar nomor yang ingin diberi tahu
//             const message = `Mesin 1 Selesai Beroperasi!`;
//             await sendMessages(phone, message);
//         }
//     }
// });




