const rhumService = require('../services/rhumService');

exports.getAllRhums = async (req, res) => {
  try {
    const rhums = await rhumService.getAllRhums();
    res.status(200).json(rhums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRhumsWithFilter = async (req, res) => {
  try {
    const filters = req.query;
    const rhums = await rhumService.getRhumsWithFilter(filters);
    res.status(200).json(rhums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};