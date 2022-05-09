'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      walkDuration: {
        type: Sequelize.INTEGER
      },
      isAccepted: {
        type: Sequelize.BOOLEAN
      },
      isComplete: {
        type: Sequelize.BOOLEAN
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      walkerId: {
        type: Sequelize.INTEGER
      },
      dogId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobs');
  }
};