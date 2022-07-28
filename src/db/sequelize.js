const { Sequelize, Model, DataTypes } = require("sequelize");
const UserModel = require("../models/UserModel");
const TeamModel = require("../models/TeamModel");
const LocationModel = require("../models/LocationModel");
const TournamentModel = require("../models/TournamentModel");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres", //'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const Team = TeamModel(sequelize);
const User = UserModel(sequelize);
const Location = LocationModel(sequelize);
const Tournament = TournamentModel(sequelize);

//A tournament can be created only by one user, but a user can create multiple tournaments
User.hasMany(Tournament,{foreignKey: "created_by", sourceKey: "id",});
Tournament.belongsTo(User, {foreignKey: 'created_by', targetKey: 'id'});

//A tournament has many players(users) and a user can play in different tournaments
User.belongsToMany(Tournament,{through: 'Tournament_Players'});
Tournament.belongsToMany(User,{through: 'Tournament_Players'});

//A team has many players(users) and a user can play in different teams
User.belongsToMany(Team,{through: 'Team_Players'});
Team.belongsToMany(User,{through: 'Team_Players'});


sequelize.sync().then(console.log("DB is synced"));

module.exports = {
    sequelize,
    User,
    Team,
    Tournament,
    Location
}
