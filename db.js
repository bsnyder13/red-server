const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    // "postgres://postgres:EFA2021!@localhost:5432/red-project"
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: "postgres"
    }
    );

module.exports = sequelize;