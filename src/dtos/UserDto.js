module.exports = class UserDto {
    username;
    email;
    id;
    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.username = model.username;
    }
}