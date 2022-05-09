'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Dog, {
        as: 'dogs',
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      User.hasMany(models.Job, {
        as: 'job_posted',
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      User.hasMany(models.Job, {
        as: 'job_accepted',
        foreignKey: 'walkerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true,
        
        validate: {
          isEmail: true
        }
    }, 
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    userType: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    bio: DataTypes.TEXT,
    zipcode: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};