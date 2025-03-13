const express = require("express");
const protect = require("../middlewares/authMiddleware"); // JWT pour sécuriser
const { getAllRhums, getRhumsWithFilter } = require("../controllers/rhumControllers");

const router = express.Router();

router.get("/", protect, getAllRhums);
router.get("/getRhums", protect, getRhumsWithFilter);

module.exports = router;