const jwt = require('jsonwebtoken');
const {Token} = require('../db/sequelize');
require('dotenv').config();

const generateTokens = async(payload) =>{
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'});
    const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
    return {accessToken, refreshToken};
}

const saveToken = async(userId, refreshToken) =>{
    const tokenData = await Token.findOne({where: {userId}});
    if(tokenData) {
        await tokenData.update({refreshToken});
    }
    else {
        await Token.create({userId, refreshToken});
    }
}

const removeToken = async(refreshToken) =>{
    const tokenData = await Token.destroy({where:{refreshToken}});
    return tokenData;
}

const validateAccessToken = (accessToken) =>{
    try {
        console.log(process.env.JWT_ACCESS_SECRET);
        const userData =  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        return userData;
    }
    catch (error) {
        return null;
    }
}

const validateRefreshToken = (refreshToken) =>{
    try {
        const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        return userData;
    }
    catch (error) {
        return null;
    }
}

const findToken = async(token) => {
    const tokenData = await Token.findOne({where: {refreshToken: token}});
    return tokenData;
}

const getTokenBearer = async(authorization) => {

}


module.exports = {
    generateTokens,
    saveToken,
    removeToken,
    validateRefreshToken,
    validateAccessToken,
    findToken
}