const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("user", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
};
