const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
    static init(sequelize) {
        super.init({
            pago: DataTypes.BOOLEAN,
            status: DataTypes.STRING,
            valorFinal: DataTypes.DOUBLE,
            dataEntrega: DataTypes.DATE,
            valorEntrega: DataTypes.DOUBLE,
            tipoEntrega: DataTypes.STRING,
            observacao: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'pedidos'
        })
    }

    //associacao de pedido e cliente
    static associate(models) {
        //um pedido pertence a um cliente
        this.belongsTo(models.Cliente, { foreignKey: 'idCliente', as: 'cliente' });

        //um pedido pertence/possui um endereco
        this.belongsTo(models.Endereco, { foreignKey: 'idEnderecoEntrega', as: 'endereco' });

        //um pedido tem muitos itens
        this.hasMany(models.ItemPedido, { foreignKey: 'idPedido', as: 'itensPedido' });

        //um pedido pertence a um carrinho
        // this.belongsTo(models.Carrinho, { foreignKey: 'idCarrinho', as: 'carrinho' });
    }
}

module.exports = Pedido;