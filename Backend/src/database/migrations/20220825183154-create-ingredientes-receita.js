'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('ingredientes_receita', {
      idReceita: { //chave estrangeira
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'receitas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      idIngrediente: { //chave estrangeira
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ingredientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      quantIngrediente: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      unidadeDeMedida: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('ingredientes_receita');

  }
};
