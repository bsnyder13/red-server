const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:EFA2021!@localhost:5432/red-project");

module.exports = sequelize;