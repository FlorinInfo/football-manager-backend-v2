const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("team", {
        name: {allowNull: false,type: DataTypes.STRING},
        color: {allowNull: false,type: DataTypes.STRING}
    });
};
