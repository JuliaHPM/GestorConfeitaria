'use strict';
const { hash } = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const passwordHash = await hash("admin", 7);

    const cliente = await queryInterface.bulkInsert('clientes', [{
      nome: "Admin",
      email: "admin@gmail.com",
      dataNasc: "23/01/2002",
      telefone: "",
      fotoPerfil: "",
      sexo: "",
      senha: passwordHash,
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    // console.log(cliente)

    await queryInterface.bulkInsert('carrinho', [{
      idCliente: cliente[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },

  async down(queryInterface, Sequelize) {
    return (
      queryInterface.bulkDelete('clientes', null, {}),
      queryInterface.bulkDelete('carrinho', null, {})
    )
  }
};
