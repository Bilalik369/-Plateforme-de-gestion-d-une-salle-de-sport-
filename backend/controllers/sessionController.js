
const Session = require("../models/Session");
const Reservation = require("../models/Reservation");

const createSession = async (req, res) => {
    const { title, description, date } = req.body;

    try {
        const newSession = new Session({
            title,
            description,
            date,
            trainer: req.user.id,
        });

        await newSession.save();
        res.json(newSession);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

const getAvailableSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ date: { $gte: new Date() } });
        res.json(sessions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

const reserveSession = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(400).json({ msg: "Session not found" });
        }

        const reservation = new Reservation({
            member: req.user.id,
            session: sessionId,
        });

        await reservation.save();
        res.json(reservation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

const cancelReservation = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const reservation = await Reservation.findOneAndDelete({ member: req.user.id, session: sessionId });
        if (!reservation) {
            return res.status(400).json({ msg: "Reservation not found" });
        }

        res.json({ msg: "Reservation cancelled" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { createSession, getAvailableSessions, reserveSession, cancelReservation };
