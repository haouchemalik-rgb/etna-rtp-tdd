import Sequence from 'mysql2/typings/mysql/lib/protocol/sequences/Sequence';
import { DataTypes } from 'sequelize';
import sequelize from '../instance';

const Task = sequelize.define('Task', 
{
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      title: {
       type: DataTypes.STRING,
       allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      rankId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
})


export default Task;