const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const {sendRegistrationEmail} = require("./MailService");
const UserDto = require("../dtos/UserDto");
const {generateTokens,saveToken} = require("./TokenService");


const Registration = async (username, email, password) => {
    try {
        const userInstance = await User.findOne({where: {email}});
        if(userInstance) throw new Error(`User with ${email} is already registered.`);
        const cryptedPassword = await bcrypt.hash(password,3);
        const user =  await User.create({
            username,
            email,
            password:cryptedPassword,
        })
        await sendRegistrationEmail(email);
        const userDto = new UserDto(user); //id, email, username
        const tokens = await generateTokens({...userDto});
        console.log(tokens);
        await saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user:userDto
        }
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    Registration
}