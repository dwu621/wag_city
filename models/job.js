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
    }
  }
  Job.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    walkDuration: DataTypes.INTEGER,
    isAccepted: DataTypes.BOOLEAN,
    isComplete: DataTypes.BOOLEAN,
    ownerId: DataTypes.INTEGER,
    walkerId: DataTypes.INTEGER,
    dogId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
    tableName: 'jobs'
  });
  return Job;
};