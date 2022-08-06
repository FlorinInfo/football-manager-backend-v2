const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("user", {
    username: {type:DataTypes.STRING,allowNull: false},
    email: {type:DataTypes.STRING,unique: true,allowNull: false},
    password: {type:DataTypes.STRING,allowNull: false}
  });
};
