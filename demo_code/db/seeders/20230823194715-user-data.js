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
    // let users = [
    //   { birthdate: '09-15-1989', username: 'backend_daddy', password: 'hunter2', email: 'alec@alec.alec', faveGameId: 2 },
    //   { birthdate: '01-01-1942', username: 'dantheman', password: 'password123!', email: 'dan@dan.dan', faveGameId: 4 },
    //   { birthdate: '07-14-1789', username: 'franco_revolution', password: 'motedepasse123', email: 'franco@franco.franco', faveGameId: 3 },
    //   { birthdate: '01-01-2020', username: 'test', password: 'test', email: 'test', faveGameId: 7 }
    // ]
    let users = [
      { birthdate: '09-15-1989', username: 'backend_daddy', password: 'hunter2', email: 'alec@alec.alec', faveGame: 'Diplomacy' },
      { birthdate: '01-01-1942', username: 'dantheman', password: 'password123!', email: 'dan@dan.dan', faveGame: 'My Little Pony: Adventures in Equestria' },
      { birthdate: '07-14-1789', username: 'franco_revolution', password: 'motedepasse123', email: 'franco@franco.franco', faveGame: 'Ark Nova' }
    ]
   const {User, Game} = require('../models')
  //  await User.bulkCreate(users, {validate: true})
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const game = await Game.findOne({
      where: {
        name: user.faveGame
      }
    })
    game.createUser({
      birthdate: user.birthdate,
      username: user.username,
      password: user.password, 
      email: user.email
    })
  }
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
