const ApiError = require("../exceptions/ApiError");
const {validateAccessToken} = require("../services/TokenService");

module.exports = async(req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) return next(ApiError.UnauthorizedError());
        const accessToken = authorization.split(' ')[1];
        if(!accessToken) return next(ApiError.UnauthorizedError());
        const userData = await validateAccessToken(accessToken);
        if(!userData) return next(ApiError.UnauthorizedError());
        req.user = userData;
        next();
    }
    catch (err) {
        next(ApiError.UnauthorizedError());
    }
}