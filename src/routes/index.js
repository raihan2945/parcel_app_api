const router = require("express").Router();

const authRoutes = require("./v1/auth");
const sentRoutes = require("./v1/sent");

// use the router
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/sents", sentRoutes);

module.exports = router;
