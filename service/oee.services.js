const { oee } = require('../models/oee.model');
const { performance } = require('../models/oee.model');
const { availability } = require('../models/oee.model');

//Trigger OEE
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
    createoee,
}
