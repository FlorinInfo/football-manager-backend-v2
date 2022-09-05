const {Tournament, Location} = require("../db/sequelize");
const  ApiError = require( "../exceptions/ApiError");
const {isNumeric} = require("validator");
const {sequelize} = require("../db/sequelize");

const getTournaments = async(id, userId)=> {
    if(!id) {
        const [tournaments, metadata] = await sequelize.query("" +
            "SELECT alreadyRegistered, tournament, location\n" +
            "FROM (\n" +
            "         (SELECT CASE WHEN \"userId\" IS NULL THEN false ELSE true END\n" +
            "                     alreadyRegistered,\n" +
            "                 tournaments.id,\n" +
            "                 \"locationId\"\n" +
            "          FROM tournaments\n" +
            "                   LEFT JOIN (SELECT *\n" +
            "                              FROM \"UserTournamentTeams\"\n" +
            "                              WHERE \"userId\" = "+userId + ") T\n"+
            "                             ON tournaments.id = T.\"tournamentId\") X\n" +
            "             LEFT JOIN (SELECT row_to_json(tournaments) AS \"tournament\", id\n" +
            "                        FROM tournaments) Z\n" +
            "         ON X.id = Z.id) O\n" +
            "         LEFT JOIN (SELECT row_to_json(locations) AS \"location\", id\n" +
            "                    FROM locations) L\n" +
            "                   ON L.id = O.\"locationId\"\n" +
            "\n");
        return tournaments;
    }
    else {
        //todo: Add a better query
        const tournament = await Tournament.findOne({where:{id}, include: [ { model: Location, as: 'location' }]});
        console.log(tournament)
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
        locationId:location
    })
    return tournament;
}

module.exports = {
    getTournaments,
    addTournament
}