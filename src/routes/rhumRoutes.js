const express = require("express");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser
const { getAllRhums } = require("../controllers/rhumControllers");

const router = express.Router();

router.get("/getRhums", protect, getAllRhums);

module.exports = router;