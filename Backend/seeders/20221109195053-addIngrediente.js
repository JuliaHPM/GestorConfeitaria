'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ingredientes', [{
      nome: "Leite Condensado",
      marca: "Nestle",
      quantEmb: 150,
      precoUnit: 7.5,
      precoKg: 120.00,
      unidadeDeMedida: "g/mL",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: "Leite",
      marca: "Italac",
      quantEmb: 1,
      precoUnit: 6.50,
      precoKg: 6.50,
      unidadeDeMedida: "Kg/L",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: "Farinha de trigo",
      marca: "Orquidea",
      quantEmb: 1,
      precoUnit: 16.50,
      precoKg: 16.50,
      unidadeDeMedida: "Kg/L",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: "Cacau 50%",
      marca: "Melken",
      quantEmb: 1,
      precoUnit: 36.00,
      precoKg: 36.00,
      unidadeDeMedida: "Kg/L",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: "Oleo Girassol",
      marca: "Melken",
      quantEmb: 1,
      precoUnit: 7.92,
      precoKg: 7.92,
      unidadeDeMedida: "Kg/L",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: "Chocolate Meio Amargo 40%",
      marca: "Sicao",
      quantEmb: 2,
      precoUnit: 59.90,
      precoKg: 29.95,
      unidadeDeMedida: "Kg/L",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ingredientes', null, {});
  }
};
