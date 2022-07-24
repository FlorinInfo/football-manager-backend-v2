const { Sequelize, Model, DataTypes } = require("sequelize");
const UserModel = require("../models/User");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres", //'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


const User = UserModel(sequelize);

sequelize.sync().then(console.log("DB is synced"));

module.exports = {
    sequelize,
    User,
}
