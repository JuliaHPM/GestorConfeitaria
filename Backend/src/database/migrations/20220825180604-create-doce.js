'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('doces', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nomeDoce: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idCategoria: { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categorias', key: 'id' },
        onUpdate: 'CASCADE', //quando alterar o cliente alterar tambem o id nos seus enderecos
        onDelete: 'RESTRICT' //não deixar excluir categoria que possuir relacionamento com doce
      },
      valorTotalReceitas: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      horasTrab: {
        type: Sequelize.TIME,
        allowNull: true
      },
      maoDeObra: { //horas trbalhadas * valor hora
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      valorEmbalagem: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      totalCustoProducao: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      margemLucro: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      disponivel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      valorTotalComMargem: { //preco venda
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      anotacoes: {
        type: Sequelize.STRING,
        allowNull: true
      },
      peso: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      // unidadeDeMedida: { 
      //   type: Sequelize.STRING,
      //   allowNull: true
      // },

      //peso cada porcao

      porcoes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      valorPorcao: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      custosFixos: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imagemDoce: {
        type: Sequelize.STRING,
        allowNull: true,
      }
      ,
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
    await queryInterface.dropTable('doces');

  }
};
