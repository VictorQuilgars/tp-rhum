const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const {token, userId} = await authService.register(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // SSL en prod
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
  
    res.status(200).json({
      message: "Inscription réussie",
      userId: userId
    });

  } catch (error) {
    if (error.message === 'Email already in use') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {token, userId} = await authService.login({ email, password });
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // SSL en prod
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
  
    res.status(200).json({
      message: "Connexion réussie",
      userId: userId
    });

  } catch (error) {
    console.log(error);
    if (error.message === 'Wrong email or password') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message});
    }
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
}