const User = require('../models/vqu-users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.register = async (data) => {
  const { nom, email, password, adresse } = data;

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Email already in use');
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer un nouvel utilisateur
  const user = new User({
    nom,
    email,
    password: hashedPassword,
    adresse,
  });

  // Sauvegarder l'utilisateur dans la base de données
  await user.save();

  // Générer un jeton JWT
  const token = generateToken(user);

  return { token, userId: user._id };
};

exports.login = async (data) => {
  const { email, password } = data;

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Wrong email or password');
  }

  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Wrong email or password');
  }

  // Générer un jeton JWT
  const token = generateToken(user);

  return { token, userId: user._id };
};