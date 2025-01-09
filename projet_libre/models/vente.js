const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vente = sequelize.define('Vente', {
    vente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    prix: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    monster_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    magasin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dresseur_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'vente', // Nom de la table dans PostgreSQL
    timestamps: false, // Pas de colonnes `createdAt` et `updatedAt`
});

module.exports = Vente;