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
    // let reviews = [
    //   { rating: 10, complexity: 6, content: 'Best game to lose friends over', gameId: 2, userId: 1 },
    //   { rating: 1, complexity: 5, content: 'ZOOS ARE PRISONS AND ZOO GAMES ARE BAD :( FREE THE PONIES', gameId: 3, userId: 2 },
    //   { rating: 8, complexity: 7, content: 'Ark Nova is Terraforming Mar\'s, but better', gameId: 3, userId: 3 }
    // ]
    let reviews = [
      { rating: 10, complexity: 6, content: 'Best game to lose friends over', game: 'Diplomacy', user: 'backend_daddy' },
      { rating: 1, complexity: 5, content: 'ZOOS ARE PRISONS AND ZOO GAMES ARE BAD :( FREE THE PONIES', game: 'Ark Nova', user: 'dantheman' },
      { rating: 8, complexity: 7, content: 'Ark Nova is Terraforming Mar\'s, but better', game: 'Ark Nova', user: 'franco_revolution' }
    ]
   const {Review, Game, User} = require('../models')
    // await Review.bulkCreate(reviews, {validate: true})
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];

      const game = await Game.findOne({where: {name: review.game}})
      const user = await User.findOne({where: {username: review.user}})

      await Review.create({
        rating: review.rating,
        complexity: review.complexity,
        content: review.content,
        gameId: game.id,
        userId: user.id
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
    await queryInterface.bulkDelete('Reviews')
  }
};
