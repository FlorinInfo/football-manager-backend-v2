const { Sequelize, Model, DataTypes } = require("sequelize");
const UserModel = require("../models/UserModel");
const TeamModel = require("../models/TeamModel");
const LocationModel = require("../models/LocationModel");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres", //'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const Team = TeamModel(sequelize);
const User = UserModel(sequelize);
const Location = LocationModel(sequelize);


User.belongsToMany(Team,{through: 'Team_Players'});
Team.belongsToMany(User,{through: 'Team_Players'});


sequelize.sync().then(console.log("DB is synced"));

module.exports = {
    sequelize,
    User,
    Team,
}
