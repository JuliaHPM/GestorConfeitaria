const { Model, DataTypes } = require('sequelize');

class ItemHistoricoPedido extends Model {
    static init(sequelize) {
        super.init({
            quantidade: DataTypes.INTEGER,
            valor: DataTypes.DOUBLE,
            valorTotal: DataTypes.DOUBLE,
            doce: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'itemHistoricoPedido'
        })
    }

    static associate(models) {
        this.belongsTo(models.HistoricoPedido, { foreignKey: 'idHistoricoPedido', as: 'historico' });
    }
}

module.exports = ItemHistoricoPedido;