'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('receitas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tempoPreparo: {
        type: Sequelize.TIME,
        allowNull: true
      },
      rendimento: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      unidadeDeMedida:{
        type: Sequelize.STRING,
        allowNull: false
      },
      custo: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      anotacoes: {
        type: Sequelize.STRING,
        allowNull: true
      },
      modoPreparo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipoReceita: { //poderia ser uma tabela de categorias
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
    await queryInterface.dropTable('receitas');

  }
};
