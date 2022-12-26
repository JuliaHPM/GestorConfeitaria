'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('clientes', {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Insira um email válido!'
          }
        }
      },
      dataNasc: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING(1)
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fotoPerfil: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      admin: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('clientes');

  }
};
