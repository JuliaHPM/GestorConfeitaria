'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('settings', [{
      id: 1,
      enderecoOrigem: "Rua Reinaldo Kuka, 185, Victoria II, Erechim",
      valorKm: 1.5,
      telefoneConfeitaria: "(54) 9 9687-8198",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('settings', null, {});
  }
};
