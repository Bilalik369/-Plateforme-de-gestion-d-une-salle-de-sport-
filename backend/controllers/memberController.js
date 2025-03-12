const User = require('../models/User');
const Reservation = require('../models/Reservation');


exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.email = email || user.email;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: "Profil mis à jour" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


exports.reserveSession = async (req, res) => {
  try {
    const { sessionId, userId } = req.body;
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session non trouvée" });
    }

    if (session.reservations.includes(userId)) {
      return res.status(400).json({ message: "Vous avez déjà réservé cette session" });
    }

    session.reservations.push(userId);
    await session.save();

    const reservation = new Reservation({ user: userId, session: sessionId });
    await reservation.save();

    res.status(200).json({ message: "Réservation effectuée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
