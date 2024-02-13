const router = require("express").Router();

const authRoutes = require("./v1/auth");
const sentRoutes = require("./v1/sent");
const receivedLocalRoutes = require("./v1/received_local");
const receivedInternaionalRoutes = require("./v1/received_international");

// use the router
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/sents", sentRoutes);
router.use("/api/v1/received_locals", receivedLocalRoutes);
router.use("/api/v1/received_internationals", receivedInternaionalRoutes);

module.exports = router;
