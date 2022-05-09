'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'dogs',
      [
        {
          name: 'Sofie',
          gender: 'Female',
          weight: 15,
          breed: 'Poodle',
          image:'https://placedog.net/500',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Linabell',
          gender: 'Female',
          weight: 65,
          breed: 'Husky',
          image:'https://placedog.net/500',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dogs', null, {});
    
  }
};
