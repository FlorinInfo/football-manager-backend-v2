const { Sequelize, Model, DataTypes } = require("sequelize");
const UserModel = require("../models/User");

const sequelize = new Sequelize("db", "username", "password", {
  host: "localhost",
  dialect: "postgres", //'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


const User = UserModel(sequelize);

sequelize.sync().then(console.log("DB is synced"));

module.exports = {
    sequelize,
    User,
}
