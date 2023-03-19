const { parameter } = require("../models/param.model");

// CREATE DATA
async function createParameter(params, callback) {
    if (!params) {
        return callback({
            message: "Parameter Required",
        }),
            ""
    };

    const ParamModel = parameter(params);
    ParamModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//READ DATA
async function getParameter(params, callback) {
    const ParamName = params.ParamName;
    var condition = ParamName
        ? {
            ParamName: { $regex: new RegExp(ParamName), $option: "i" },
        }
        : {};
    parameter
        .find(condition)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//UPDATE / RESET DATA Mesin 1
async function resetParam(params,callback){
    parameter.updateMany({machine_id: 1},params)
    .then((response) => {
        if (!response) callback("Gagal Input");
        else return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

//UPDATE / RESET DATA Mesin 2
async function resetParamM2(params,callback){
    parameter.updateMany({machine_id: 2},params)
    .then((response) => {
        if (!response) callback("Gagal Input");
        else return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

//UPDATE / RESET DATA Mesin 3
async function resetParamM3(params,callback){
    parameter.updateMany({machine_id: 3},params)
    .then((response) => {
        if (!response) callback("Gagal Input");
        else return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

//UPDATE / RESET DATA Mesin 4
async function resetParamM4(params,callback){
    parameter.updateMany({machine_id: 4},params)
    .then((response) => {
        if (!response) callback("Gagal Input");
        else return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}


//READ DATA TERBARU Mesin 1
async function latestParameter1(params, callback) {
    parameter.find({ machine_id: 1 }).sort({ _id: -1 }).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ DATA TERBARU Mesin 2
async function latestParameter2(params, callback) {
    parameter.find({ machine_id: 2 }).sort({ _id: -1 }).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ DATA TERBARU Mesin 3
async function latestParameter3(params, callback) {
    parameter.find({ machine_id: 3 }).sort({ _id: -1 }).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ DATA TERBARU Mesin 4
async function latestParameter4(params, callback) {
    parameter.find({ machine_id: 4 }).sort({ _id: -1 }).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

module.exports = {
    createParameter,
    getParameter,
    resetParam,
    resetParamM2,
    resetParamM3,
    resetParamM4,
    latestParameter1,
    latestParameter2,
    latestParameter3,
    latestParameter4
};