
const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, sessionController.createSession);
router.get("/available", authMiddleware, sessionController.getAvailableSessions);
router.post("/reserve/:sessionId", authMiddleware, sessionController.reserveSession);
router.delete("/cancel/:sessionId", authMiddleware, sessionController.cancelReservation);

module.exports = router;
