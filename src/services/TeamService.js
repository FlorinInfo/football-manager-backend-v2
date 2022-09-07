const {
    isValidColorName,
    isValidHSL,
    isValidRGB,
} = require('is-valid-css-color');
const {Team, UserTournamentTeam} = require("../db/sequelize");
const ApiError = require('../exceptions/ApiError');

const addTeam = async (name, color)=> {
    const errors = [];
    if(!isValidColorName(color)) errors.push("ColorErr");
    if(!name) errors.push("NameErr")
    if(errors.length) throw ApiError.BadRequest("TeamError", errors);
    const team = await Team.create({name, color});
    if(!team) throw ApiError.BadRequest("TeamError", []);
    return team;
}

const addUser = async (tournamentId, teamId, playerId) => {
    const errors = [];
    if(!tournamentId) errors.push("TournamentIdError");
    if(!teamId) errors.push("TeamIdError");
    if(!playerId) errors.push("PlayerIdError");
    if(errors.length) throw ApiError.BadRequest("UTTaddError", errors);
    const UTTinstance = await UserTournamentTeam.findOne({where: {userId:playerId, tournamentId}});
    if(!UTTinstance) throw ApiError.BadRequest("UTTaddError", ["UTTinstanceNotFound",]);
    await UTTinstance.update({teamId});
    return UTTinstance;
}

module.exports = {
    addTeam,
    addUser
}