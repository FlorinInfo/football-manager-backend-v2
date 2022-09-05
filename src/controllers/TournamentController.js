const {getTournaments, addTournament} = require('../services/TournamentService');
const ApiError = require("../exceptions/ApiError");
const {validateAccessToken} = require('../services/TokenService');

const GetTournaments = async(req, res, next) => {
    try {
        const {userId} = req.body;
        const id = req.query.id;
        if(!id) {
            const tournaments = await getTournaments(null, userId);
           return res.status(200).json(tournaments);
        }
        else {
            const tournament = await getTournaments(id, userId);
            return res.status(200).json(tournament);
        }
    }
    catch (error) {
        next(error);
    }
}

const AddTournament = async(req, res, next)=> {
    try {
        const {userId, name, price, numberOfPlayers, description, startTime, endTime, location} = req.body;

        const tournament = await addTournament(
            userId,
            name,
            price,
            numberOfPlayers,
            description,
            startTime,
            endTime,
            location,
        )
        res.status(201).json(tournament);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    GetTournaments,
    AddTournament
}