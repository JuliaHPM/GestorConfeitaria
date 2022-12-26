'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('ingredientes', {
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
      marca: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quantEmb: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      unidadeDeMedida:{
        type: Sequelize.STRING,
        allowNull: false
      },
      precoUnit: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      precoKg: {
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
    await queryInterface.dropTable('ingredientes');

  }
};
