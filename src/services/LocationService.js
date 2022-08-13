const {Location} = require('../db/sequelize');
const ApiError = require("../exceptions/ApiError");

const addLocation = async (locationName)=> {
        if(!locationName || locationName.length <3 ) throw  ApiError.BadRequest('LocationErr',[`Invalid location provided`]);
        const locationInstance = await Location.findOne({where: {name: locationName}});
        if(locationInstance) {
            throw  ApiError.BadRequest('LocationErr',[`Location ${locationName} already exists`]);
        }
        const location = await Location.create({
            name: locationName,
            rating: 0
        })
        return location;
}

const updateLocation = async (id, name)=> {
    if(!name || name.length <3 ) throw  ApiError.BadRequest('LocationErr',[`Invalid location provided`]);
    const locationInstance = await Location.findOne({where: {name}});
    if(locationInstance) {
        throw  ApiError.BadRequest('LocationErr',[`Location ${name} already exists`]);
    }
    const location = await Location.findOne({where:{id}});
    await location.update({name});
    return location;
}


const deleteLocation = async (id)=> {
    const location =  await Location.destroy({where: {id}});
    return location;
}

const getLocations = async ()=> {
    const locations = await Location.findAll();
    return locations;
}

module.exports = {
    addLocation,
    updateLocation,
    deleteLocation,
    getLocations
}