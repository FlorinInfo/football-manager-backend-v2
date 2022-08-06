const jwt = require('jsonwebtoken');
const {Token} = require('../db/sequelize');
const generateTokens = async(payload) =>{
    const accessToken =await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
    const refreshToken =await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
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

module.exports = {
    generateTokens,
    saveToken,
}