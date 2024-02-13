const router = require("express").Router();
const { controllers: receivedLocalController } = require("@/src/api/received_local");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

// //* : GET ALL TRAINING BY DOCTOR
router.post("/", receivedLocalController.createNewItem);

router.get("/", receivedLocalController.getAllItems);

router.get("/:id", receivedLocalController.getItemById);

router.put("/:id", receivedLocalController.updateItemById);

router.delete("/:id", receivedLocalController.deleteItemById);

module.exports = router;
