const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/auth');


exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "L'email est déjà utilisé" });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    return res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }


    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn });
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
