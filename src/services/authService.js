const User = require('../models/vqu-users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.register = async (data) => {
  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ email: data.email });
  if (userExists) {
    throw new Error('Email already in use');
  }

  // Créer un nouvel utilisateur
  const user = new User({
    nom : data.nom,
    email : data.email,
    password : data.password,
    adresse : data.adresse,
  });

  console.log(user);

  // Sauvegarder l'utilisateur dans la base de données
  await user.save();

  // Générer un jeton JWT
  const token = generateToken(user);

  return { token: token, userId: user._id };
};

exports.login = async (data) => {
  const { email, password } = data;
  //console.log("Fonction login: email de connexion = ", email);
  //console.log("Fonction login: password de connexion = ", password);

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ email : email });
  if (!user) {
    throw new Error('Wrong email or password');
  }
  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  //console.log("Fonction login : comparaison entre le password fourni: ", password, " et le password dans la bdd: ", user.password, " et le résultat du compare est : ", isMatch);
  if (!isMatch) {
    throw new Error('Wrong email or password');
  }

  // Générer un jeton JWT
  const token = generateToken(user);

  return {token : token, userId : user._id};
}