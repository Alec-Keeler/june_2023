'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let users = [
      { birthdate: '09-15-1989', username: 'backend_daddy', password: 'hunter2', email: 'alec@alec.alec', faveGameId: 2 },
      { birthdate: '01-01-1942', username: 'dantheman', password: 'password123!', email: 'dan@dan.dan', faveGameId: 4 },
      { birthdate: '07-14-1789', username: 'franco_revolution', password: 'motedepasse123', email: 'franco@franco.franco', faveGameId: 3 }
    ]
   const {User} = require('../models')
   await User.bulkCreate(users, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users')
  }
};
