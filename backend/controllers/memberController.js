const User = require('../models/User');
const Reservation = require('../models/Reservation');

exports.updateProfile = async(req , res) =>{
    try{
        const{userId} = req.params;
        const{email , password , role} = req.body;


        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg : "utilisateur non trouver"});
        }

        user.email = email || user.email;
        user.password = password ? await bcrypt.hash(password, 10) : user.password;
        user.role = role || user.role;


        await user.save();
        res.status(201).json({msg:'Profil a mis jour'})

    }catch (err){
        res.status(500).json({ message: "Erreur serveur", error });
    }
};