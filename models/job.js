'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {
        as: 'posted_by',
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      }),
      Job.belongsTo(models.User, {
        as: 'accepted_by',
        foreignKey: 'walkerId',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      })
      Job.belongsTo(models.Dog, {
        as: 'dog',
        foreignKey: 'dogId',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      })

    }
  }
  Job.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    walkDuration: DataTypes.INTEGER,
    isAccepted: DataTypes.BOOLEAN,
    isComplete: DataTypes.BOOLEAN,
    ownerId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
    },
    walkerId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    dogId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
          model: 'dogs',
          key: 'id'
      }
    } 
  }, {
    sequelize,
    modelName: 'Job',
    tableName: 'jobs'
  });
  return Job;
};