const ApiError = require("../exceptions/ApiError");
const {validateAccessToken} = require("../services/TokenService");

module.exports = async(req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) return next(ApiError.UnauthorizedError());
        const accessToken = authorization.split(' ')[1];
        // console.log(accessToken);
        if(!accessToken) return next(ApiError.UnauthorizedError());
        const userData = await validateAccessToken(accessToken);
        console.log(userData);
        if(!userData) return next(ApiError.UnauthorizedError());
        // req.user = userData;
        next();
    }
    catch (err) {
        console.error(err);
        next(ApiError.UnauthorizedError());
    }
}