
// TIDAK DI PAKAI..........................

const productServices = require("../service/product.services");
const upload = require("../middleware/upload");


//INSERT DATA
exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : "",

            };

            productServices.createProduct(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });
        }
    });
};

//READ ALL DATA
exports.findAll = (req, res, next) => {
    var model = {
        productName: req.query.productName,
    };

    productServices.getProducts(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

// READ SINGLE DATA
exports.findOne = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };

    productServices.getProductsbyId(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};

// UPDATE DATA
exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                productId: req.params.id,
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : "",

            };

            productServices.updateProduct(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });
        }
    });
};

//DELETE DATA
exports.delete = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };

    productServices.deleteProduct(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};