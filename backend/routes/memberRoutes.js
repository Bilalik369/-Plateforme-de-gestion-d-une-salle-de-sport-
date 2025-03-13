const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/profile", authMiddleware, memberController.reserveSession);


router.put("/profile", authMiddleware, memberController.updateProfile);

module.exports = router;
