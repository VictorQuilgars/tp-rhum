const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { nom, email, password, adresse } = req.body;
    const result = await authService.register({ nom, email, password, adresse });
    res.status(201).json(result);
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
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Wrong email or password') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};