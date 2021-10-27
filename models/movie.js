const { DataTypes } = require("sequelize");
const db = require("../db");

const Movie = db.define("Movie", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Movie;