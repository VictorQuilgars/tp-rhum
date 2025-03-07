const User = require("../models/vqu-users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { nom, email, password, adresse } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already in use" });

    const user = new User({ nom, email, password, adresse });
    await user.save();

    res.status(201).json({ token: generateToken(user), userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Wrong email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong email or password" });

    res.json({ token: generateToken(user), userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};