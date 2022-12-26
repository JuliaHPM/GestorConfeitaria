const {Model, DataTypes} = require('sequelize');

class ItemCarrinho extends Model {
    static init(sequelize) {
        super.init({
            quantidadeItem: DataTypes.INTEGER,
            valorItem: DataTypes.DOUBLE,
            valorTotalItem: DataTypes.DOUBLE
        },{
            sequelize,
            tableName: 'itemCarrinho'
        })
    }

    //relacionamentos
    //um itemCarrinho pertence a um carrinho
    //um itemCarrinho pertence a um doce
    static associate(models) {
        this.belongsTo(models.Doce, {foreignKey: 'idDoce', as: 'doce'});
        this.belongsTo(models.Carrinho, {foreignKey: 'idCarrinho', as: 'carrinho'});
    }
}

module.exports = ItemCarrinho;