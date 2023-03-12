const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const paramController = require("../controller/param.controller");
const stockController = require("../controller/stock.controller");
const statusController = require("../controller/status.controller");
const energyController = require("../controller/energy.controller");
const oeeController = require("../controller/oee.controller");

const express = require("express");
const router = express.Router();

// USERS LIST
router.post("/users", userController.create);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//Login & Register
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user-profile", authController.userProfile);

//Parameter
router.post("/inputParam", paramController.create);
router.put("/resetParamM1", paramController.update);
router.get("/allParam", paramController.findAll);
router.get("/singleParam/:id", paramController.findOne);
router.delete("/deleteParam", paramController.delete);
router.get("/latestParamM1", paramController.latestM1);
router.get("/latestParamM2", paramController.latestM2);

//Stock
router.post("/inputStock", stockController.create);
router.get("/allStock", stockController.findAll);
router.delete("/DeleteStock", stockController.delete);
router.get("/StockM1", stockController.M1);
router.get("/StockM2", stockController.M2);
router.put("/addStockM1", stockController.addM1);

//Status
router.post("/insertStat", statusController.create);
router.get("/getStatus", statusController.status);
router.get('/getStatusM1', statusController.statusM1);
router.get('/getStatusM2', statusController.statusM2);
router.get('/getStatusM3', statusController.statusM3);
router.get('/getStatusM4', statusController.statusM4);
router.put("/statusM1", statusController.updateSM1);
router.put("/statusM2", statusController.updateSM2);

//Energy
router.post("/insertEnergy", energyController.create);
router.get("/latestEnergy", energyController.newEnergy);
router.get("/grafikEnergy", energyController.graphEnergy);

module.exports = router;