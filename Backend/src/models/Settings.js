const { Model, DataTypes } = require('sequelize');

class Settings extends Model {
    static init(sequelize) {
        super.init({
            valorKm: DataTypes.DOUBLE,
            taxaEntrega: DataTypes.DOUBLE,
            enderecoOrigem: DataTypes.STRING,
            telefoneConfeitaria: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'settings'
        })
    }

    static associate(models) {
        // this.hasOne(models.Endereco, { foreignKey: 'id', as: 'endereco' });
        // this.belongsTo(models.Endereco, { foreignKey: 'idEnderecoOrigem', as: 'endereco' });
    }
}

module.exports = Settings;