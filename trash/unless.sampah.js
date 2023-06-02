auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            //AUTH
            { url: "/api/login", methods: ["POST"] },
            { url: "/api/register", methods: ["POST"] },
            //USERS
            // { url: "/api/users", methods: ["POST"] },
            // { url: "/api/users/:id", methods: ["PUT"] },
            // { url: "/api/users/:id", methods: ["DELETE"] },
            //PARAMETER
            // { url: "/api/inputParam", methods: ["POST"] },
            // { url: "/api/resetParamM1", methods: ["PUT"] },
            // { url: "/api/resetParamM2", methods: ["PUT"] },
            // { url: "/api/resetParamM3", methods: ["PUT"] },
            // { url: "/api/resetParamM4", methods: ["PUT"] },
            // { url: "/api/deleteParam", methods: ["DELETE"] },
            { url: "/api/latestParamM1", methods: ["GET"] },
            { url: "/api/latestParamM2", methods: ["GET"] },
            { url: "/api/latestParamM3", methods: ["GET"] },
            { url: "/api/latestParamM4", methods: ["GET"] },
            //STOCK
            // { url: "/api/inputStock", methods: ["POST"] },
            // { url: "/api/deleteStock", methods: ["DELETE"] },
            // { url: "/api/addStock", methods: ["PUT"] },
            { url: "/api/kurangiStock", methods: ["PUT"] },
            //STATUS
            { url: "/api/insertStat", methods: ["POST"] },
            { url: "/api/updateStatusM", methods: ["PUT"] },
            //ENERGY
            { url: "/api/insertEnergy", methods: ["POST"] },
            //PRESSURE
            { url: "/api/insertPressure", methods: ["POST"] },
            { url: "/api/deletePressure", methods: ["DELETE"] },
            //OEE
            // { url: "/api/trigOEE", methods: ["POST"] },
            // { url: "/api/resetOEE", methods: ["PUT"] },
            //QUALITY
            // { url: "/api/trigQuality", methods: ["POST"] },
            { url: "/api/processed", methods: ["PUT"] },
            // { url: "/api/resetQuality", methods: ["PUT"] },
            // { url: "/api/defect", methods: ["PUT"] },
            //AVAILABILITY
            // { url: "/api/trigAvailability", methods: ["POST"] },
            // { url: "/api/resetAvailability", methods: ["PUT"] },
            { url: "/api/latestAvailability", methods: ["GET"] },
            //PERFORMANCE
            // { url: "/api/trigPerformance", methods: ["POST"] },
            // { url: "/api/resetPerformance", methods: ["PUT"] },
            //COST PRICE
            // { url: "/api/trigCost", methods: ["POST"] },
            // { url: "/api/resetCost", methods: ["PUT"] },
            //PRODUCTION (Tidak di pakai)
            // { url: "/api/insertProduction", methods: ["POST"] },
            // { url: "/api/resetProcessed", methods: ["PUT"] },
            //LIFETIME
            // { url: "/api/trigLT", methods: ["POST"] },
            //TROUBLESHOOT
            // { url: "/api/trigTB", methods: ["POST"] },
            // { url: "/api/updateTB", methods: ["PUT"] },
            //PREVENTIVE
            // { url: "/api/updatePrevStatus", methods: ["PUT"] },
            // { url: "/api/updateJadwalPrev", methods: ["PUT"] },
        ],
    })
);