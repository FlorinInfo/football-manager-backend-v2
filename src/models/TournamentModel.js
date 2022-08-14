const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("tournament", {
        numberOfPlayers:DataTypes.INTEGER,
        price:DataTypes.INTEGER,
        description:DataTypes.STRING,
        startTime: {
            type:DataTypes.INTEGER,
            defaultValue: 1660479982
        },
        endTime: {
            type:DataTypes.INTEGER,
            defaultValue: 1660479982
        }
    });
};
