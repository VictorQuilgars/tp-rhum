const Rhum = require('../models/rhums');

exports.getAllRhums = async (req, res) => {
  try {
    const rhums = await Rhum.find();
    res.status(200).json(rhums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
