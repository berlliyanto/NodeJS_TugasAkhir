const {status} = require('../models/status.model');

//CREATE STATUS
async function createStatus(params, callback) {
    if (!params) {
        return callback({
            message: "status Required",
        }),
            ""
    };
    const statusModel = status(params);
    statusModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//READ STATUS Mesin 
async function getstatusM(params,callback) {
    status.find().then((response) => {
        if (!response) callback("No STATUS");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ STATUS Mesin 1
async function getstatusM1(params,callback) {
    status.find({ machine_id: 1 }).limit(1).then((response) => {
        if (!response) callback("No STATUS");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ STATUS Mesin 2
async function getstatusM2(params,callback) {
    status.find({ machine_id: 2 }).limit(1).then((response) => {
        if (!response) callback("No STATUS");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ STATUS Mesin 3
async function getstatusM3(params,callback) {
    status.find({ machine_id: 3 }).limit(1).then((response) => {
        if (!response) callback("No STATUS");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ STATUS Mesin 4
async function getstatusM4(params,callback) {
    status.find({ machine_id: 4 }).limit(1).then((response) => {
        if (!response) callback("No STATUS");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//SET STATUS MESIN
async function setStatusM(params,callback){
    var m_id = params.machine_id;
    var statusm = params.status;
    status.findOneAndUpdate(
        {machine_id: m_id},
        {$set:{
            status: statusm
        }
    })
    .then((response) => {
        if (!response) callback("Gagal Input");
        else return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}


module.exports = {
    createStatus,
    getstatusM,
    getstatusM1,
    getstatusM2,
    getstatusM3,
    getstatusM4,
    setStatusM,
}