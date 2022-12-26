'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('diasEncomenda', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      diaSemana: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantidadePedidosDia: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pedidosAceitos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantidadeDisponivel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diasEncomenda');

  }
};
