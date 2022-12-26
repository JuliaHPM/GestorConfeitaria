'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('valorHora', 'id', {

        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false

      })
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('valorHora', 'id', {

        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

      })
    ])
  }
};
