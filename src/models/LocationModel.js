const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("team", {
        name: DataTypes.STRING,
        // image: DataTypes.DECIMAL ,
        rating: DataTypes.INTEGER,
    });
};
