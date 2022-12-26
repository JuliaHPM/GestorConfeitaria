'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // idCarrinho: { //chave estrangeira
      //   type: Sequelize.INTEGER,
      //   allowNull: false, 
      //   references: { model: 'carrinho', key: 'id' }, 
      //     onUpdate: 'CASCADE', 
      //     onDelete: 'CASCADE'
      // },
      idCliente: { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE', //quando alterar o cliente alterar tambem o id nos seus enderecos
        onDelete: 'CASCADE'
      },
      idEnderecoEntrega: { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: true, //não precisa ter endereco de entrega se for retirada
        references: { model: 'enderecos', key: 'id' },
        onUpdate: 'CASCADE', //quando alterar o cliente alterar tambem o id nos seus enderecos
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('pedidos');

  }
};
