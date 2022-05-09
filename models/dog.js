'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dog.belongsTo(models.User, {
        as: 'owner',
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Dog.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    image: DataTypes.STRING,
    ownerId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    } 
  }, {
    sequelize,
    modelName: 'Dog',
    tableName: 'dogs'
  });
  return Dog;
};