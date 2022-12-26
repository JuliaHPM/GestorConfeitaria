const { Model, DataTypes } = require('sequelize');

class Endereco extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            cidade: DataTypes.STRING,
            bairro: DataTypes.STRING,
            rua: DataTypes.STRING,
            numero: DataTypes.INTEGER,
            complemento: DataTypes.STRING,
            pontoReferencia: DataTypes.STRING,
            cep: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'enderecos'
        })
    }

    //associacoes
    //um endereco pertence a um cliente
    //um endereco tem muitos pedidos
    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'idCliente', as: 'cliente' });
        this.hasMany(models.Pedido, { foreignKey: 'idEnderecoEntrega', as: 'pedidos' });
        this.hasOne(models.Settings, { foreignKey: 'idEnderecoOrigem', as: 'endereco' });
    }
}

module.exports = Endereco;