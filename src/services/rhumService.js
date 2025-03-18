const Rhum = require('../models/rhums');

exports.getAllRhums = async () => {
  return await Rhum.find();
};

exports.getRhumsWithFilter = async (filters) => {
  return await Rhum.find(filters);
};