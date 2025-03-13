
const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/sessions", authMiddleware, trainerController.getSessions);
router.get("/members/:sessionId", authMiddleware, trainerController.getSessionMembers);

module.exports = router;
