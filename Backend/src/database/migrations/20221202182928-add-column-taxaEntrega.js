'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('settings', 'taxaEntrega', Sequelize.DOUBLE)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('settings', 'taxaEntrega')
  }
};
