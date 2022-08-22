const {Team} = require("../db/sequelize");

const addTeam = async (name, color)=> {
    const errors = [];
    if(!CSS.supports('color', color)) errors.push("ColorErr");
    if(!name) errors.push("NameErr")
    if(errors.length) throw ApiError.BadRequest("TeamError", errors);
    const team = await Team.create({name, color});
    return team;
}

module.exports = {
    addTeam
}