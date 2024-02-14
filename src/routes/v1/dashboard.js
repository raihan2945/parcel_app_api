const router = require("express").Router();
const { controllers: dashboardController } = require("@/src/api/dashboard");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

// //* : GET ALL TRAINING BY DOCTOR
// router.post("/", receivedInternationalController.createNewItem);

router.get("/", dashboardController.getDashboardData);

// router.get("/:id", receivedInternationalController.getItemById);

// router.put("/:id", receivedInternationalController.updateItemById);

// router.delete("/:id", receivedInternationalController.deleteItemById);

module.exports = router;
