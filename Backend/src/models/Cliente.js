const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            dataNasc: DataTypes.DATE,
            telefone: DataTypes.STRING,
            fotoPerfil: DataTypes.STRING,
            sexo: DataTypes.STRING(1),
            senha: DataTypes.STRING,
            admin: DataTypes.BOOLEAN
        }, {
            sequelize,
            tableName: 'clientes'
        })
    }

    //associacao de endereco e cliente
    //um cliente tem muitos enderecos
    //um cliente tem muitos pedidos
    //um cliente tem um carrinho
    static associate(models) {
        this.hasMany(models.Endereco, { foreignKey: 'idCliente', as: 'enderecos' });
        this.hasMany(models.Pedido, { foreignKey: 'idCliente', as: 'pedidos' });
        this.hasOne(models.Carrinho, { foreignKey: 'idCliente', as: 'carrinho' });
    }
}

module.exports = Cliente;