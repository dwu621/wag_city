'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users', 
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johnd@email.com',
          passwordDigest: '123456',
          userType: 'Owner',
          bio: `I'm John`,
          zipcode: 60188 ,
          image: `https://randomuser.me/api/portraits/men/57.jpg`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Jill',
          lastName: 'Doe',
          email: 'joed@email.com',
          passwordDigest: '123456',
          userType: 'Walker',
          bio: `I'm Jill`,
          zipcode: 60186 ,
          image: `https://randomuser.me/api/portraits/women/50.jpg`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'James',
          lastName: 'Doe',
          email: 'jamesd@email.com',
          passwordDigest: '123456',
          userType: 'Walker',
          bio: `I'm Jim`,
          zipcode: 60187 ,
          image: `https://randomuser.me/api/portraits/men/45.jpg`,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
