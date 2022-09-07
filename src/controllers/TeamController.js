const {addTeam, addUser} = require("../services/TeamService");

const AddTeam = async (req, res, next) => {
    try {
        const {name, color} = req.body;
        console.log(req.body)
        const team = await addTeam(name,color);
        return res.status(201).json(team);
    }
    catch(err) {
        next(err);
    }
}

const AddUser = async(req, res, next) => {
    try {
        const {tournamentId, teamId, playerId} = req.body;
        const UTTinstance = await addUser(tournamentId, teamId, playerId);
        return res.status(200).json(UTTinstance);
    }
    catch(err) {
        next(err);
    }
}



module.exports = {
    AddTeam, AddUser
}