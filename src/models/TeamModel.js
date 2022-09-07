const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("team", {
        name: {allowNull: false,type: DataTypes.STRING},
        color: {allowNull: false,type: DataTypes.STRING},
        rating:{allowNull: false,type: DataTypes.INTEGER,defaultValue:0},
        attacking:{allowNull: false,type: DataTypes.INTEGER, defaultValue:0},
        defense:{allowNull: false,type: DataTypes.INTEGER, defaultValue:0},
    });
};
