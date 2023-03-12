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

//READ DATA by ID
async function getParameterbyId(params, callback) {
    const ParamId = params.ParamId;
    parameter
        .findById(ParamId)
        .then((response) => {
            if (!response) callback("Param ID invalid");
            else return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};


//DELETE DATA
async function deleteParameter(params, callback) {
    const ParamId = params.ParamId;
    parameter
        .findByIdAndRemove(ParamId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Param ID invalid");
            else return callback(null, response);
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

module.exports = {
    createParameter,
    resetParam,
    getParameter,
    getParameterbyId,
    deleteParameter,
    latestParameter1,
    latestParameter2
};