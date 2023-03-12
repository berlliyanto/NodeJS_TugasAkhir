
// TIDAK DI PAKAI..........................

const {product} = require("./app.models");

// CREATE DATA
async function createProduct(params, callback){
    if(!params.productName){
        return callback({
            message: "Product Name Required",
        }),
        ""
    };

    const productModel = product(params);
    productModel
    .save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
};

//READ DATA
async function getProducts(params, callback){
    const productName = params.productName;
    var condition  = productName
        ?{
            productName: {$regex: new RegExp(productName), $option: "i"},
        }
        : {};
    product
    .find(condition)
    .then((response) => {
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
};

//READ DATA by ID
async function getProductsbyId(params, callback){
    const productId = params.productId;
    product
    .findById(productId)
    .then((response) => {
        if(!response) callback("product ID invalid");
        else return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
};

//UPDATE DATA
async function updateProduct(params, callback){
    const productId = params.productId;
    product
    .findByIdAndUpdate(productId, params, {useFindAndModify: false})
    .then((response) => {
        if(!response) callback("product ID invalid");
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
};

//DELETE DATA
async function deleteProduct(params, callback){
    const productId = params.productId;
    product
    .findByIdAndRemove(productId, params, {useFindAndModify: false})
    .then((response) => {
        if(!response) callback("product ID invalid");
        else return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
};

module.exports = {
    getProductsbyId,
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};