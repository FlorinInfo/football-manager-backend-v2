const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const {sendRegistrationEmail} = require("./MailService");
const UserDto = require("../dtos/UserDto");
const {generateTokens,saveToken, removeToken, validateRefreshToken, findToken} = require("./TokenService");
const ApiError = require("../exceptions/ApiError");

const Registration = async (username, email, password) => {
        const userInstance = await User.findOne({where: {email}});
        if(userInstance) throw ApiError.BadRequest(`User with ${email} is already registered.`);
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
    const userInstance = await User.findOne({where: {email}});
    if(!userInstance) throw ApiError.BadRequest("User with this email is not registered");
    const validatePassword = await bcrypt.compare(password, userInstance.password);
    if(!validatePassword) throw ApiError.BadRequest("Provided password is invalid");
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

module.exports = {
    Registration,
    Login,
    Logout,
    Refresh,
    Users
}