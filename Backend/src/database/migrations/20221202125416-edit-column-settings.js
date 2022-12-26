'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.renameColumn('settings', 'idEnderecoOrigem', 'enderecoOrigem');

    // await queryInterface.removeColumn('settings', 'idEnderecoOrigem')
    await queryInterface.addColumn('settings', 'telefoneConfeitaria', Sequelize.STRING)

    // await queryInterface.changeColumn('settings', 'enderecoOrigem', {
    //   type: Sequelize.STRING,
    //   // allowNull: true,
    // })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('settings', 'telefoneConfeitaria')

    // await queryInterface.changeColumn('settings', 'enderecoOrigem', {
    //   type: Sequelize.INTEGER,
    //   // allowNull: true,
    // })
    // await queryInterface.renameColumn('settings', 'enderecoOrigem', 'idEnderecoOrigem');


  }
};
