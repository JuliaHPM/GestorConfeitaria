'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('valorHora', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
        allowNull: false
      },
      horasTrabMes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rendaDesejada: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valorHora: {
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
    await queryInterface.dropTable('valorHora');

  }
};
