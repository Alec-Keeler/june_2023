'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Games', 'available', {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
      allowNull: false
    })
    await queryInterface.renameColumn('Games', 'minAge', 'minApprovedAge')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Games', 'available')
    await queryInterface.renameColumn('Games', 'minApprovedAge', 'minAge')
  }
};
