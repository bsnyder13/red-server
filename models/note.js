const { DataTypes } = require("sequelize");
const db = require("../db");

const Note = db.define("Note", {
    title: {
        type: DataTypes.STRING
    },
    preference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // userID: DataTypes.INTEGER,
})

module.exports = Note;