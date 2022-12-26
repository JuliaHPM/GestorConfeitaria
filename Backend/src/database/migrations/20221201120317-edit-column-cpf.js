'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('clientes', 'cpf', 'telefone');

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('clientes', 'telefone', 'cpf');
  }
};
