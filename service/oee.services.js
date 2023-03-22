
const { response } = require('express');
const { oee } = require('../models/oee.model');
const { quality } = require('../models/oee.model');
const { performance } = require('../models/oee.model');
const { availability } = require('../models/oee.model');

//Nilai OEE
async function createoee(params, callback) {
    if (!params) {
        return callback({
            message: "oee Required",
        }),
            ""
    };

    const OEEmodel = oee(params);
    OEEmodel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

// QUALITY M1
async function QualityM1(params, callback) {
    quality.bulkWrite([
        {
            updateOne: {
                filter: {
                    $and: [
                        { machine_id: 1 },
                        { state: 1 }
                    ]
                },
                update: {
                    $inc: {
                        good: params.processed - params.defect,
                        defect: params.defect,
                        processed: params.processed,
                        qualityrate: (params.processed - params.defect) / params.processed
                    }
                }
            }
        },
        {
            insertOne: {
                document: {
                    machine_id: params.machine_id,
                    state: 1,
                }
            },
        },
        
    ]).then((response) => {
        if (!response) callback("Gagal")
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

module.exports = {
    createoee,
    QualityM1
}
