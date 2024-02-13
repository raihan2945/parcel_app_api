const router = require("express").Router();
const { controllers: sentController } = require("@/src/api/sent");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

// //* : GET ALL TRAINING BY DOCTOR
router.post("/", sentController.createNewItem);

router.get("/", sentController.getAllItems);

router.get("/:id", sentController.getItemById);

router.put("/:id", sentController.updateItemById);

router.delete("/:id", sentController.deleteItemById);

module.exports = router;
