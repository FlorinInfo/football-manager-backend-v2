const UserService = require('../services/UserService');

const UserRegistration = async(req, res, next) => {
    try {
        const {username, email, password} = req.body;
        // console.log(req.body)
        // res.send(req.body);
        const userData = await UserService.Registration(username, email, password);
        res.cookie("refreshToken",userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true});//30 days
        res.send(userData);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({error: err.toString()});
    }
}
const UserLogin = async(req, res, next) => {
    try {

    }
    catch (err) {

    }
}

const UserLogout = async(req, res, next) => {
    try {

    }
    catch (err) {

    }
}

const UserTokenRefresh = async(req, res, next) => {
    try {

    }
    catch (err) {

    }
}

const GetUsers = async(req, res, next) => {
    try {
        res.send({x:1})
    }
    catch (err) {

    }
}



module.exports = {
    UserRegistration,
    UserLogin,
    UserTokenRefresh,
    GetUsers,
    UserLogout
}