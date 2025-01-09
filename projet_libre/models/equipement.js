const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipement = sequelize.define('Equipement', {
    equipement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    arene_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'equipement', // Nom de la table dans PostgreSQL
    timestamps: false, // Pas de colonnes `createdAt` et `updatedAt`
});

module.exports = Equipement;
