const { Model, DataTypes } = require('sequelize');

class ItemPedido extends Model {
    static init(sequelize) {
        super.init({
            quantidade: DataTypes.INTEGER,
            valor: DataTypes.DOUBLE,
            valorTotal: DataTypes.DOUBLE
        }, {
            sequelize,
            tableName: 'itemPedido'
        })
    }

    //relacionamentos
    //um itemPedido pertence a um pedido
    //um itemPedido pertence a um doce
    static associate(models) {
        this.belongsTo(models.Doce, { foreignKey: 'idDoce', as: 'doce' });
        this.belongsTo(models.Pedido, { foreignKey: 'idPedido', as: 'pedido' });
    }
}

module.exports = ItemPedido;