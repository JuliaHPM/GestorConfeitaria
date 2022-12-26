'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('itemCarrinho', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idDoce: { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false, //tipo de relacao, sempre tera um doce relacionado
        references: { model: 'doces', key: 'id' }, 
          onUpdate: 'CASCADE', 
          onDelete: 'CASCADE'
      },
      idCarrinho: { //chave estrangeira
        type: Sequelize.INTEGER, 
        allowNull: false, //1-0
        references: { model: 'carrinho', key: 'id' }, 
          onUpdate: 'CASCADE', //quando alterar o cliente alterar tambem no carrinho
          onDelete: 'CASCADE'
      },
      quantidadeItem: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      valorItem: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valorTotalItem: {
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
    await queryInterface.dropTable('itemCarrinho');

  }
};
