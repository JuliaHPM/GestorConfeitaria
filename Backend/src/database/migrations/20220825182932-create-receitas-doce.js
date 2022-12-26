'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('receitas_doce', {
      idReceita: { //chave estrangeira
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false, //tipo de relacao, sempre tera um doce relacionado
        references: { model: 'receitas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      idDoce: { //chave estrangeira
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false, //tipo de relacao, sempre tera um doce relacionado
        references: { model: 'doces', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantReceita: { //quantidade que sera utilizada no doce
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
    await queryInterface.dropTable('receitas_doce');

  }
};
