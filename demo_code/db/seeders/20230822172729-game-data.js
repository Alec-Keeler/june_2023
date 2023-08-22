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
  //  await queryInterface.bulkInsert('Games', [
  //    { name: 'Twilight Imperium', minPlayers: 9, maxPlayers: 8, category: 'Strategy', cost: 131.99, avgPlayTime: 360, minAge: 14 },
  //    { name: 'Diplomacy', minPlayers: 2, maxPlayers: 7, category: 'Strategy', cost: 29.99, avgPlayTime: 360, minAge: 12 },
  //    { name: 'Ark Nova', minPlayers: 1, maxPlayers: 4, category: 'Euro', cost: 69.95, avgPlayTime: 120, minAge: 14 },
  //    { name: 'My Little Pony: Adventures in Equestria', minPlayers: 1, maxPlayers: 4, category: 'Deck-Building cost:', cost: 37.95, avgPlayTime: 60, minAge: 14 },
  //    { name: 'Brass: Birmingham', minPlayers: 2, maxPlayers: 4, category: 'Strategy', cost: 79.95, avgPlayTime: 90, minAge: 14 },
  //    { name: 'Gloomhaven', minPlayers: 1, maxPlayers: 4, category: 'Coop', cost: 170, avgPlayTime: 90, minAge: 14 },
  //    { name: 'The Castles of Burgundy', minPlayers: 2, maxPlayers: 4, category: 'Euro', cost: 49.99, avgPlayTime: 60, minAge: 12 },
  //    { name: 'Spirit Island', minPlayers: 1, maxPlayers: 4, category: 'Coop', cost: 63.48, avgPlayTime: 105, minAge: 1 }
  //  ])

  const {Game} = require('../models')
  try {
    await Game.bulkCreate([
      { name: 'Twilight Imperium', minPlayers: 3, maxPlayers: 8, category: 'Strategy', cost: 131.99, avgPlayTime: 360, minAge: 14 },
      { name: 'Diplomacy', minPlayers: 2, maxPlayers: 7, category: 'Strategy', cost: 29.99, avgPlayTime: 360, minAge: 12 },
      { name: 'Ark Nova', minPlayers: 1, maxPlayers: 4, category: 'Euro', cost: 69.95, avgPlayTime: 120, minAge: 14 },
      { name: 'My Little Pony: Adventures in Equestria', minPlayers: 1, maxPlayers: 4, category: 'Deck-Building cost:', cost: 37.95, avgPlayTime: 60, minAge: 14 },
      { name: 'Brass: Birmingham', minPlayers: 2, maxPlayers: 4, category: 'Strategy', cost: 79.95, avgPlayTime: 90, minAge: 14 },
      { name: 'Gloomhaven', minPlayers: 1, maxPlayers: 4, category: 'Coop', cost: 170, avgPlayTime: 90, minAge: 14 },
      { name: 'The Castles of Burgundy', minPlayers: 2, maxPlayers: 4, category: 'Euro', cost: 49.99, avgPlayTime: 60, minAge: 12 },
      { name: 'Spirit Island', minPlayers: 1, maxPlayers: 4, category: 'Coop', cost: 63.48, avgPlayTime: 105, minAge: 1 }
    ], {validate: true})
  } catch(e) {
    console.log(e)
  }
  }, //INSERT INTO Games (colnames) VALUES (record), (record)

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Games', {
      name: ['Twilight Imperium', 'Diplomacy', 'Ark Nova', 'My Little Pony: Adventures in Equestria', 'Brass: Birmingham', 'Gloomhaven', 'The Castles of Burgundy', 'Spirit Island']
    })  // DELETE FROM Games WHERE name IN ();
  }
};
