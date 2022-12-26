'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('valorHora', [{
      id: 1,
      horasTrabMes: 200,
      rendaDesejada: 1000.00,
      valorHora: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('valorHora', null, {});
  }
};
