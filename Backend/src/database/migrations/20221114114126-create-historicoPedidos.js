'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('historicoPedidos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cliente: { //chave estrangeira
        type: Sequelize.STRING,
        allowNull: false,
      },
      enderecoEntrega: { //chave estrangeira
        type: Sequelize.STRING,
        allowNull: true, //não precisa ter endereco de entrega se for retirada
      },
      pago: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.STRING
      },
      valorFinal: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      dataEntrega: {
        type: Sequelize.DATE,
        allowNull: false
      },
      valorEntrega: {
        type: Sequelize.DOUBLE
      },
      tipoEntrega: {
        type: Sequelize.STRING,
        allowNull: false
      },
      observacao: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('historicoPedidos');
  }
};
