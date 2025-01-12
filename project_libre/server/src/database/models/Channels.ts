import { DataTypes } from 'sequelize';
import sequelize from '../instance';

const Channels = sequelize.define('Channels', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  messages: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  }
});

export default Channels;
