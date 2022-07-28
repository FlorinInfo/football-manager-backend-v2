const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("tournament", {
        numberOfPlayers:DataTypes.INTEGER,
        price:DataTypes.INTEGER,
        description:DataTypes.STRING,
        // startTime:DataTypes.TIME,
        // endTime:DataTypes.TIME,
    });
};
