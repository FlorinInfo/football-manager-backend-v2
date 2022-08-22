const {addTeam} = require("../services/TeamService");
const ApiError = require("../exceptions/ApiError");

const AddTeam = async (req, res, next) => {
    try {
        const {name, color} = req.body;
        const team = await AddTeam(name,color);
        if(!team) throw  ApiError.BadRequest("TeamError");
        return res.status(201).json(team);
    }
    catch(err) {
        next(err);
    }
}

module.exports = {
    AddTeam
}