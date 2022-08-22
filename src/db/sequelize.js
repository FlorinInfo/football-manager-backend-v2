const { Sequelize, Model, DataTypes } = require("sequelize");
const UserModel = require("../models/UserModel");
const TeamModel = require("../models/TeamModel");
const LocationModel = require("../models/LocationModel");
const TournamentModel = require("../models/TournamentModel");
const TokenModel = require("../models/TokenModel");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres", //'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const Team = TeamModel(sequelize);
const User = UserModel(sequelize);
const Location = LocationModel(sequelize);
const Tournament = TournamentModel(sequelize);
const Token = TokenModel(sequelize);

//A tournament can be created only by one user, but a user can create multiple tournaments
User.hasMany(Tournament,{foreignKey: "created_by"});
Tournament.belongsTo(User, {foreignKey: 'created_by'});

//A tournament has many players(users) and a user can play in different tournaments
//A team has many players(users) and a user can play in different teams
//A tournament has many teams and a team  can play in different tournaments
const UserTournamentTeam = sequelize.define('UserTournamentTeam', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

Team.belongsToMany(Tournament, { through: UserTournamentTeam });
Tournament.belongsToMany(Team, { through: UserTournamentTeam });
User.belongsToMany(Tournament, { through: UserTournamentTeam });
Tournament.belongsToMany(User, { through: UserTournamentTeam });
User.belongsToMany(Team, { through: UserTournamentTeam });
Team.belongsToMany(User, { through: UserTournamentTeam });

UserTournamentTeam.belongsTo(User);
UserTournamentTeam.belongsTo(Tournament);
UserTournamentTeam.belongsTo(Team);
Tournament.hasMany(UserTournamentTeam);
Team.hasMany(UserTournamentTeam);
User.hasMany(UserTournamentTeam);

// const UserTournamentTeam = sequelize.define('UserTournamentTeam', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     }
// });
//
// User.belongsToMany(TournamentTeam, { through: UserTournamentTeam });
// TournamentTeam.belongsToMany(User, { through: UserTournamentTeam });
// UserTournamentTeam.belongsTo(User);
// UserTournamentTeam.belongsTo(TournamentTeam);
// User.hasMany(UserTournamentTeam);
// TournamentTeam.hasMany(UserTournamentTeam);


// User.belongsToMany(GameTeam, { through: PlayerGameTeam });
// GameTeam.belongsToMany(Player, { through: PlayerGameTeam });
// PlayerGameTeam.belongsTo(Player);
// PlayerGameTeam.belongsTo(GameTeam);
// Player.hasMany(PlayerGameTeam);
// GameTeam.hasMany(PlayerGameTeam);
// User.belongsToMany(Tournament,{through: 'Tournament_Players', as:"userId"});

Tournament.belongsToMany(User,{through: 'Tournament_Players',as:"tournamentId"});
User.belongsToMany(Team,{through: 'Tournament_Players'});
// Team.belongsToMany(User,{through: 'Tournament_Players', as:"teamId"});

//Every tournament has his own location
Location.hasMany(Tournament);
Tournament.belongsTo(Location);

//A team has many players(users) and a user can play in different teams
// User.belongsToMany(Team,{through: 'Tournament_Players'});


//Every token belongs to a user
User.hasOne(Token);
Token.belongsTo(User);

sequelize.sync().then(console.log("DB is synced"));

module.exports = {
    sequelize,
    User,
    Team,
    Tournament,
    Location,
    Token
}
