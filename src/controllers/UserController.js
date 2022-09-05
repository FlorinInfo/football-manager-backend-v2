const UserService = require('../services/UserService');
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/ApiError");
const {UserTournamentTeam} = require("../db/sequelize");

const UserRegistration = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return(next(ApiError.BadRequest('Validation errors', errors.array())));
        }
        const {username, email, password} = req.body;
        // console.log(req.body)
        // res.send(req.body);
        const userData = await UserService.Registration(username, email, password);
        res.cookie("refreshToken",userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true});//30 days
        res.status(200).send(userData);
    }
    catch (err) {
        next(err)
    }
}
const UserLogin = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const userData = await UserService.Login(email, password);
        res.cookie("refreshToken",userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true});//30 days
        res.status(200).send(userData);
    }
    catch (err) {
        next(err)
    }
}

const UserLogout = async(req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        await UserService.Logout(refreshToken);
        res.clearCookie("refreshToken");
        res.status(200).json({});
    }
    catch (err) {
        next(err);
    }
}

const UserTokenRefresh = async(req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const userData = await UserService.Refresh(refreshToken);
        res.cookie("refreshToken",userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true});//30 days
        res.status(200).send(userData);
    }
    catch (err) {
        next(err);
    }
}

const GetUsers = async(req, res, next) => {
    try {
        const users = await UserService.Users();
        res.send(users);
    }
    catch (err) {
        next(err);
    }
}

const UserRegisterToTournament = async(req, res, next) => {
    try {
        console.log(req.body);
        const {userId, tournamentId} = req.body;
        const UserTournament = await UserService.RegisterToTournament(userId, tournamentId);
        res.status(200).json(UserTournament);
    }
    catch (err) {
        next(err);
    }
}



module.exports = {
    UserRegistration,
    UserLogin,
    UserTokenRefresh,
    GetUsers,
    UserLogout,
    UserRegisterToTournament
}