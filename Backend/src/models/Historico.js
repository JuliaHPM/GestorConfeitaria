const { Model, DataTypes } = require('sequelize');

class HistoricoPedidos extends Model {
    static init(sequelize) {
        super.init({
            cliente: DataTypes.STRING,
            enderecoEntrega: DataTypes.STRING,
            pago: DataTypes.BOOLEAN,
            status: DataTypes.STRING,
            valorFinal: DataTypes.DOUBLE,
            dataEntrega: DataTypes.DATE,
            valorEntrega: DataTypes.DOUBLE,
            tipoEntrega: DataTypes.STRING,
            observacao: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'historicoPedidos'
        })
    }

    //associacao de pedido e cliente
    static associate(models) {
        //um historico tem muitos itens
        this.hasMany(models.ItemHistorico, { foreignKey: 'idHistoricoPedido', as: 'itensHistorico' });
    }
}

module.exports = HistoricoPedidos;