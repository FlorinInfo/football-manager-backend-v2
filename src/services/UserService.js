const { User, UserTournamentTeam} = require("../db/sequelize");
const bcrypt = require("bcrypt");
const {sendRegistrationEmail} = require("./MailService");
const UserDto = require("../dtos/UserDto");
const {generateTokens,saveToken, removeToken, validateRefreshToken, findToken} = require("./TokenService");
const ApiError = require("../exceptions/ApiError");

const Registration = async (username, email, password) => {
        const userInstance = await User.findOne({where: {email}});
        if(userInstance) throw ApiError.BadRequest(`EmailError`,[`User with ${email} is already registered`]);
        const cryptedPassword = await bcrypt.hash(password,3);
        const user =  await User.create({
            username,
            email,
            password:cryptedPassword,
        })
        await sendRegistrationEmail(email);
        const userDto = new UserDto(user); //id, email, username
        const tokens = await generateTokens({...userDto});
        await saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user:userDto
        }
}

const Login = async(email, password) => {
    if(!email) throw ApiError.BadRequest("EmailError",["Please provide a valid email address"]);
    const userInstance = await User.findOne({where: {email}});
    if(!userInstance) throw ApiError.BadRequest("EmailError",["User with this email is not registered"]);
    const validatePassword = await bcrypt.compare(password, userInstance.password);
    if(!validatePassword) throw ApiError.BadRequest("PasswordError",["Provided password is invalid"]);
    const userDto = new UserDto(userInstance); //id, email, username
    const tokens = await generateTokens({...userDto});
    await saveToken(userDto.id, tokens.refreshToken);

    return {
        ...tokens,
        user:userDto
    }
}

const Logout = async(refreshToken)=> {
    const token = await removeToken(refreshToken);
    return token;
}

const Refresh = async(refreshToken)=> {
    if(!refreshToken) {
        throw ApiError.UnauthorizedError();
    }
    const userData = await validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if(!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }
    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user); //id, email, username
    const tokens = await generateTokens({...userDto});
    await saveToken(userDto.id, tokens.refreshToken);
    return {
        ...tokens,
        user:userDto
    }
}

const Users = async ()=> {
        const users = await User.findAll();
        return users;
}

const RegisterToTournament = async (userId, tournamentId)=> {
    if(!tournamentId) throw ApiError.BadRequest("TournamentError",["Invalid tournament id"]);
    if(!userId) throw ApiError.BadRequest("UserError",["Invalid user id"]);
    const errors = [];
    const UserTournamentInstance = await UserTournamentTeam.findOne({where: {userId, tournamentId}});
    if(UserTournamentInstance) errors.push("alreadyRegistered");
    if(errors.length) throw ApiError.BadRequest("RegisterToTournamentError", errors);
    const registerInstance = await UserTournamentTeam.create({userId, tournamentId});
    return registerInstance;
}

const UpdateAttacking = async (id, att)=> {
    const errors = [];
    const userInstance = await User.findOne({where: {id}});
    if(!userInstance) errors.push("Invalid user id");
    console.log(typeof att)
    if(typeof att != "number" || att < 0 || att > 10) errors.push("Invalid attacking mark");
    if(errors.length) throw ApiError.BadRequest("UpdateAttackingErr", errors);
    let attacking = userInstance.attacking;
    if(attacking === 0) await userInstance.update({attacking:att});else await userInstance.update({attacking:(Number(att)+Number(attacking))/2});
    await userInstance.update({rating:(Number(userInstance.attacking) + Number(userInstance.defense))/2});
    return userInstance;
}

const UpdateDefense = async (id, def)=> {
    const errors = [];
    const userInstance = await User.findOne({where: {id}});
    if(!userInstance) errors.push("Invalid user id");
    console.log( def)
    if(typeof def != "number" || def < 0 || def > 10) errors.push("Invalid defensing mark");
    if(errors.length) throw ApiError.BadRequest("UpdateDefensingMark", errors);
    let defense = userInstance.defense;
    if(defense === 0) await userInstance.update({defense:def});else await userInstance.update({defense:(Number(def)+Number(defense))/2});
    await userInstance.update({rating:(Number(userInstance.attacking) + Number(userInstance.defense))/2});
    return userInstance;
}

module.exports = {
    Registration,
    Login,
    Logout,
    Refresh,
    Users,
    RegisterToTournament,
    UpdateAttacking,
    UpdateDefense
}