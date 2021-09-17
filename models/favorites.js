const { DataTypes } = require("sequelize");
const db = require("../db");

const Favorites = db.define("favorites", {
    title: {
        type: DataTypes.STRING,
        alllowNull: false
    },
    date: {
        type: DataTypes.STRING,
        alllowNull: false
    },
    activity: {
        type: DataTypes.STRING,
        alllowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Favorites;