const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("location", {
        name: {type:DataTypes.STRING,allowNull: false},
        // image: DataTypes.DECIMAL ,
        rating: DataTypes.INTEGER,
    });
};
