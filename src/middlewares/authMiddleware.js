const jwt = require("jsonwebtoken");
const User = require("../models/vqu-users"); // Assurez-vous d'avoir ce modèle

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Accès non autorisé, aucun token fourni" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.user._id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré", error : error.message });
  }
};

module.exports = protect;