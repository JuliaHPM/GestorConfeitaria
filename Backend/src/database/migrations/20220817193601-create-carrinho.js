'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('carrinho', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idCliente: { //chave estrangeira
        type: Sequelize.INTEGER, 
        allowNull: false, //1-1
        references: { model: 'clientes', key: 'id' }, 
          onUpdate: 'CASCADE', //quando alterar o cliente alterar tambem no carrinho
          onDelete: 'CASCADE'
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
    await queryInterface.dropTable('carrinho');

  }
};
