const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('monstermon', 'malik', 'malik', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;
