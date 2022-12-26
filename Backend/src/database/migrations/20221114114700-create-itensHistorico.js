'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('itemHistorico', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      doce: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idHistorico: { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'historicoPedidos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valorTotal: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('itemHistorico');

  }
};
