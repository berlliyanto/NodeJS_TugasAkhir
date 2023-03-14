const express = require("express");
const app = express();

const {Client} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client();

const mongoose = require("mongoose");
const {MONGO_DB_CONFIG} = require("./config/app.config");

const auth = require ("./middleware/auth");
const errors = require ("./middleware/errors");
const {unless} = require("express-unless");

mongoose.Promise = global.Promise;
var Port = process.env.port || 5000;

mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    ()=> {
        console.log("Database Connected to : ", MONGO_DB_CONFIG);
    },
    (error) => {
        console.log("Database can't connected " + error);
    }
);
 
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path:[
            //AUTH
            {url: "/api/login", methods: ["POST"]},
            {url: "/api/register", methods: ["POST"]},
            //USERS
            {url: "/api/users", methods: ["POST"]},
            {url: "/api/users/:id", methods: ["PUT"]},
            {url: "/api/users/:id", methods: ["DELETE"]},
            //PARAMETER
            {url: "/api/inputParam", methods: ["POST"]},
            {url: "/api/resetParamM1", methods: ["PUT"]},
            {url: "/api/deleteParam", methods: ["DELETE"]},
            //STOCK
            {url: "/api/inputStock", methods: ["POST"]},
            {url: "/api/deleteStock", methods: ["DELETE"]},
            {url: "/api/addStockM1", methods: ["PUT"]},
            //STATUS
            {url: "/api/insertStat", methods: ["POST"]},
            {url: "/api/statusM1", methods: ["PUT"]},
            {url: "/api/statusM2", methods: ["PUT"]},
            //ENERGY
            {url: "/api/insertEnergy", methods: ["POST"]},
        ],
    })
);

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);

app.listen(Port, function(){
    console.log("Connected to : ", Port)    
});

//-------------------------WHATSAPP BOT-----------------------//
// client.on('qr',(qr)=>{
//     qrcode.generate(qr,{small:true});
// });

// client.on('ready',()=>{
//     console.log("Client is ready");
// });

// client.initialize();


