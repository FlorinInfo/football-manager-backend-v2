const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("token", {
       refreshToken:{type:DataTypes.STRING, required:true},
    });
};
