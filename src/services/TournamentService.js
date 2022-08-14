const {Tournament} = require("../db/sequelize");
const  ApiError = require( "../exceptions/ApiError");
const {isNumeric} = require("validator");

const getTournaments = async(id)=> {
    if(!id) {
        const tournaments = await Tournament.findAll();
        return tournaments;
    }
    else {
        const tournament = await Tournament.findOne({where:{id}});
        if(!tournament) throw ApiError.BadRequest("TournamentError",["Invalid tournament id"]);
        return tournament;
    }
};

const addTournament = async (userId, name, price,  numberOfPlayers, description, startTime, endTime, location) => {
    const errors = [];
    if(!name || name.length < 3) errors.push('nameError');
    if(!price || isNaN(price)) errors.push('priceError');
    if(!numberOfPlayers || isNaN(numberOfPlayers)) errors.push('numberOfPlayersError');
    if(!location) errors.push('locationError');
    //todo validate timestamp
    if(errors.length) throw ApiError.BadRequest("TournamentError", errors);
    const tournament = Tournament.create({
        created_by:userId,
        name,
        price,
        numberOfPlayers,
        description,
        Location:location
    })
    return tournament;
}

module.exports = {
    getTournaments,
    addTournament
}