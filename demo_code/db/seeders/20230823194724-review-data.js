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
    let reviews = [
      { rating: 10, complexity: 6, content: 'Best game to lose friends over', gameId: 2, userId: 1 },
      { rating: 1, complexity: 5, content: 'ZOOS ARE PRISONS AND ZOO GAMES ARE BAD :( FREE THE PONIES', gameId: 3, userId: 2 },
      { rating: 8, complexity: 7, content: 'Ark Nova is Terraforming Mar\'s, but better', gameId: 3, userId: 3 }
    ]
   const {Review} = require('../models')
    await Review.bulkCreate(reviews, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews')
  }
};
