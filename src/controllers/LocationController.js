const ApiError = require("../exceptions/ApiError");
const {addLocation, deleteLocation,updateLocation, getLocations} = require("../services/LocationService");

const AddLocation = async(req, res, next) => {
    try {
        const {name} = req.body;
        const location = await addLocation(name);
        if (!location) throw ApiError.BadRequest("LocationErr", ["Invalid location provided"]);
        return res.status(200).json(location);
    }
    catch (err) {
        next(err);
    }
}

const UpdateLocation = async(req, res, next) => {
    try {
        const {id, name} = req.body;
        const location = await updateLocation(id, name);
        if(!location) throw ApiError.BadRequest("LocationErr", ["Updating location failed"]);
        return res.status(200).json(location);
    }
    catch (err) {
        next(err);
    }
}

const DeleteLocation = async(req, res, next) => {
    try {
        const {id} = req.body;
        const deleted = await deleteLocation(id);
        console.log("deleted",deleted);
        if(!deleted) {
            throw ApiError.BadRequest("LocationErr", ["Location not found"]);
        }
        return res.status(204).json({});
    }
    catch (err) {
        next(err);
    }
}

const GetLocations = async(req, res, next) => {
    try {
        const locations = await getLocations();
        res.status(200).json({locations});
    }
    catch (err) {
        next(err);
    }

}

module.exports = {
    AddLocation, DeleteLocation,UpdateLocation, GetLocations
}