const troubleshoot = require('../models/troubleshoot.model');

//CREATE DATA
async function trigTB(params, callback){
    if(!params){
        return callback("Params required");
    }
    const TBmodel = new troubleshoot(params);
    TBmodel.save()
    .then((response)=>{
        if(!response) callback("Ggagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

//REQUEST PERBAIKAN (GET NEW DATA)
async function getReqTB(params, callback){
    var m_id = params.machine_id;
    troubleshoot.find({machine_id:m_id}).sort({_id:-1}).limit(100)
    .then((response)=>{
        if(!response) callback("Ggagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

//UPDATE PERBAIKAN
async function UpdateTB(params, callback){
    var m_id = params.machine_id;
    var ket = params.keterangan;
    var solve = params.solved;
    var idorder = params.idorder;
    var to = params.to;
    troubleshoot.findOneAndUpdate({
        $and:[
            {machine_id:m_id},{idorder:idorder}
        ]
    },{
        $set:{
            to: to,
            keterangan: ket,
            solved: solve,
            state: 0
        }
    })
    .then((response)=>{
        if(!response) callback("Ggagal");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

module.exports = {
    trigTB,
    getReqTB,
    UpdateTB,
}