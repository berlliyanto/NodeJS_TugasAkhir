const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const paramController = require("../controller/param.controller");
const stockController = require("../controller/stock.controller");
const statusController = require("../controller/status.controller");
const energyController = require("../controller/energy.controller");
const pressureController = require("../controller/pressure.controller");
const oeeController = require("../controller/oee.controller");
const productionController = require("../controller/production.controller");
const qualityController = require("../controller/quality.controller");
const availabilityController = require("../controller/availability.controller");
const performanceController = require("../controller/performance.controller");
const costpriceController = require("../controller/costprice.controller");
const liftimeController = require("../controller/lifetime.controller");
const troubleshootController = require("../controller/troubleshoot.controller");
const preventiveController = require("../controller/preventive.controller");

const express = require("express");
const router = express.Router();

// USERS LIST
router.post("/users", userController.create);
router.get("/users", userController.findAll);
router.get("/userMT", userController.getUserrMT);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//Login & Register
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user-profile", authController.userProfile);

//Parameter
router.post("/inputParam", paramController.create);
router.put("/resetParamM1", paramController.ResetM1);
router.put("/resetParamM2", paramController.ResetM2);
router.put("/resetParamM3", paramController.ResetM3);
router.put("/resetParamM4", paramController.ResetM4);
router.get("/allParam", paramController.findAll);
router.get("/reportParam", paramController.getDashParam);
router.get("/getParamHistori", paramController.getParamHistori);
router.get("/latestParamM1", paramController.latestM1);
router.get("/latestParamM2", paramController.latestM2);
router.get("/latestParamM3", paramController.latestM3);
router.get("/latestParamM4", paramController.latestM4);

//Stock
router.get("/allStock", stockController.findAll);
router.delete("/DeleteStock", stockController.delete);
router.get("/getStock", stockController.Stock);
router.put("/addStock", stockController.add);
router.put("/kurangiStock",stockController.min);
//Riwayat Stock
router.post("/inputStock", stockController.create);
router.get("/historiStock", stockController.riwayatStock)

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

//Pressure
router.post("/insertPressure", pressureController.inputPress);
router.get("/pressureGauge", pressureController.pressGauge);
router.get("/pressureChart", pressureController.pressChart);

//OEE
router.post("/trigOEE", oeeController.OEE);
router.put("/resetOEE", oeeController.resetOee);
router.get("/getOEE", oeeController.getResultOEE);
router.get("/getdashOEE", oeeController.getDashOEE);
router.get("/getOEEHistori", oeeController.getOEEHistori);

//AVAILABILITY
router.post("/trigAvailability",availabilityController.trigAvai);
router.get("/latestAvailability", availabilityController.latestAvai);
router.put("/resetAvailability", availabilityController.resetAvai);

//QUALITY
router.post("/trigQuality", qualityController.triggerQuality);
router.get("/getQualityData", qualityController.getProcessData);
router.get("/getRecQuality", qualityController.getRecQuality);
router.get("/dashboardQuality", qualityController.getDashQuality);
router.put("/processed", qualityController.processedUnit);
router.put("/resetQuality", qualityController.resetQuality);
router.put("/defect", qualityController.defectUnit);

//PERFORMANCE
router.post("/trigPerformance", performanceController.triggerPerform);
router.put("/resetPerformance", performanceController.resetPerform);
router.get("/latestPerformance", performanceController.latestPerform);

//PRODUCTION
router.post("/insertProduction", productionController.processed);
router.get("/getProcessed", productionController.getProcessed);
router.put("/resetProcessed", productionController.resetProcessed);
router.delete("/deleteProduction", productionController.delete)

//COST PRICE
router.post("/trigCost", costpriceController.triggerCost);
router.get("/getCost", costpriceController.getCostM);
router.get("/getDashCost", costpriceController.getDashCost);
router.get("/getCostHistori", costpriceController.getCostHistori);
router.get("/getPrice", costpriceController.getPrice);
router.put("/resetCost", costpriceController.resetCP);
router.put("/updatePrice", costpriceController.updateHargaMaterial);

//LIFETIME
router.post("/trigLT", liftimeController.trigLT);
router.get("/getAllLT", liftimeController.getAllLT);
router.get("/getOneLT", liftimeController.getOneLT);

//TROUBLESHOOT
router.post("/trigTB", troubleshootController.triggerTB);
router.get("/getTB", troubleshootController.getTB);
router.put("/updateTB", troubleshootController.updateFixed);

//PREVENTIVE
router.get("/getNotif5Menit", preventiveController.getNotif5Menit);
router.get("/getNotifikasi", preventiveController.getNotifikasi);
router.get("/getPreventive", preventiveController.getPreventive);
router.put("/updatePrevStatus", preventiveController.updatePrevStatus);
router.put("/updateJadwalPrev", preventiveController.updateJadwalPrev);
router.get("/getJadwalPrev", preventiveController.getJadwalPrev);

module.exports = router;