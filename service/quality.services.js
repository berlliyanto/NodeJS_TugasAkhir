const { quality } = require('../models/oee.model');
const fetch = require('node-fetch');

const data = 'https://aplikasi-pms-berli.onrender.com/api/latestParamM1';
fetch(data).then((result)=>result.json()).then(({data})=>console.log(data));

//INSERT PROCESSED UNIT
async function insertProcessed(params, callback) {
    var nilai;
    var m_id = params.m_id;
    var tipe = params.tipe;
    var defect = params.defect
    const Processed = `http://localhost:5000/api/getProcessed?machine_id=${m_id}&state=1&status=1&tipe=${tipe}`;
    await fetch(Processed)
        .then((result) => result.json())
        .then(({ data })=> {
            if(data[0].processed == NaN){
                console.log("no data")
            }
            nilai = data[0].processed;
        } 
    ).catch((error)=>{
        return callback(error);
    });
    if(nilai == NaN || nilai == undefined){
        return callback("error");
    }else{
        const Quality = new quality({
            machine_id: Number(m_id),
            good: nilai - defect,
            defect: defect,
            processed: nilai,
            qualityrate: (nilai - defect)/nilai,
            state: 1,
        });
        Quality.save().then((response=>{
            if(!response) callback("gagal");
            return callback(null,response);
        })).catch((error)=>{
            callback(error);
        })
    } 
}


module.exports = {
    insertProcessed,
}