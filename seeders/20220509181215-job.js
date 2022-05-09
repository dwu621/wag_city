'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'jobs',
      [
        {
          title: 'walk sofie',
          description: 'walk through park',
          walkDuration: 60,
          isAccepted: true,
          isComplete: false,
          ownerId: 1,
          walkerId: 2,
          dogId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('jobs', null, {});
  }
};
