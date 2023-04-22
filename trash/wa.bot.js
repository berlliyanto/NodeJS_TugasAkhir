// const { MongoStore } = require('wwebjs-mongo');

//--------------------------------------------------------NOTIFIKASI MODULS--------------------------------------------------------------//


// const { Client, RemoteAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const User = require('./models/auth.model');
// const { availability } = require('./models/oee.model');
// const { parameter } = require('./models/param.model');

//--------------------------------------------------------NOTIFIKASI MODULS END--------------------------------------------------------------//

// mongoose.connect(MONGO_DB_CONFIG.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(
//     () => {
//         console.log("Database Connected to : Database Berli");
//         const store = new MongoStore({ mongoose: mongoose });
//         const client = new Client({
//             authStrategy: new RemoteAuth({
//                 store: store,
//                 backupSyncIntervalMs: 300000
//             })
//         });
//     },
//     (error) => {
//         console.log("Database can't connected " + error);
//     }
// );
 
 
 // client.initialize();
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
        // client.on('remote_session_saved', () => {
        //     if (msg.body === '!hello') {
        //         msg.reply('hello there');
        //     }
        // });

        // //NO HANDPHONE TERDAFTAR
        // let phoneUser = [];
        // setInterval(phone, 5000);
        // async function phone() {
        //     const FetchHP = await User.find({});
        //     FetchHP.forEach(function (doc) {
        //         const numberPhone = doc.noHp;
        //         if (!phoneUser.includes(numberPhone)) {
        //             phoneUser.push(numberPhone);
        //         }
        //     },
        //     )
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

        // const availabilityStream = availability.watch();
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
        //         if (docM1 && docM2.runningtime >= (paramM2.loading_time) * 60) {
        //             const phone = phoneUser; // daftar nomor yang ingin diberi tahu
        //             const message = `Mesin 2 Selesai Beroperasi!`;
        //             await sendMessages(phone, message);
        //         }
        //         if (docM1 && docM3.runningtime >= (paramM3.loading_time) * 60) {
        //             const phone = phoneUser; // daftar nomor yang ingin diberi tahu
        //             const message = `Mesin 3 Selesai Beroperasi!`;
        //             await sendMessages(phone, message);
        //         }
        //         if (docM1 && docM4.runningtime >= (paramM4.loading_time) * 60) {
        //             const phone = phoneUser; // daftar nomor yang ingin diberi tahu
        //             const message = `Mesin 4 Selesai Beroperasi!`;
        //             await sendMessages(phone, message);
        //         }
        //     }
        // });
        //--------------------------------------------WHATSAPP BOT CLIENT END-----------------------------------------------//