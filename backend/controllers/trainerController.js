
const Session = require("../models/Session");

const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ trainer: req.user.id });
        res.json(sessions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

const getSessionMembers = async (req, res) => {
    try {
        const session = await Session.findById(req.params.sessionId).populate('members');
        res.json(session.members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { getSessions, getSessionMembers };
