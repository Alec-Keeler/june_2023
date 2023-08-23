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
    let likes = [
      { reviewId: 1, userId: 1, like: true },
      { reviewId: 2, userId: 1, like: false },
      { reviewId: 3, userId: 1, like: true },
      { reviewId: 1, userId: 2, like: true },
      { reviewId: 3, userId: 2, like: false },
      { reviewId: 2, userId: 3, like: false },
    ]
   const {Like} = require('../models')
    await Like.bulkCreate(likes, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Likes')
  }
};
