const { energy } = require("../models/energy.model");

// CREATE DATA
async function createEnergy(params, callback) {
    if (!params) {
        return callback({
            message: "energy Required",
        }),
            ""
    };

    const ParamModel = energy(params);
    ParamModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//READ DATA TERBARU 
async function latestEnergy(params, callback) {
    energy.find().sort({ _id: -1 }).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

//READ 5 DATA TERBARU 
async function graphicEnergy(params, callback) {
    energy.find().sort({ _id: -1 }).limit(6).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
    
}

async function averagePower(params,callback){
    var tanggal = params.tanggal;
    energy.aggregate([
        {
            $match: {
              createdAt: {
                $gte: new Date(`${tanggal}T00:00:00Z`),
                $lte: new Date(`${tanggal}T23:59:59Z`)
              }
            }
          },
          {
            $group: {
              _id: null,
              averagePower: { $avg: "$power" }
            }
          }
    ]).then((response)=>{
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

module.exports = {
    latestEnergy,
    createEnergy,
    graphicEnergy,
    averagePower,
}