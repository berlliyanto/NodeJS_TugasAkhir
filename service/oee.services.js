
const {oee} = require('../models/oee.model');
const {quality} = require('../models/oee.model');
const {performance} = require('../models/oee.model');
const {availability} = require('../models/oee.model');


async function Vquality(callback){
    quality.findOne({machine_id:1},{good:1, _id:0}).sort({_id:-1}).limit(1).then((response) => {
        if (!response) callback("No Data");
        else return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

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

module.exports = {
    Vquality,
    createoee
}
