'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.renameColumn('settings', 'idEnderecoOrigem', 'enderecoOrigem');


    await queryInterface.changeColumn('settings', 'enderecoOrigem', {
      type: Sequelize.STRING,
      // allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {


    await queryInterface.changeColumn('settings', 'enderecoOrigem', {
      type: Sequelize.INTEGER,
      // allowNull: true,
    })
    // await queryInterface.renameColumn('settings', 'enderecoOrigem', 'idEnderecoOrigem');


  }
};
